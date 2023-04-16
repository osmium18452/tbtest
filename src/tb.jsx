import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Select, DatePicker, Table, Input, Space, Button} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

moment.locale('en-NZ');

export default () => {
// 自定义筛选菜单 + 表格
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };


    const reactorStatusHeader = [
        // sorter: (a, b) => a.value - b.value,
        //     ...getColumnSearchProps('col1'),
        {
            title: '位号',
            dataIndex: 'col1',
            key: 'col1',
            align: 'center',
            fixed: 'left',
            width: 70,
        },
        {
            title: '吹灰情况',
            children: [
                {
                    title: '腐蚀情况',
                    children: [
                        {
                            title: '管内',
                            dataIndex: 'col2_1_1',
                            key: 'col2_1_1',
                            align: 'center',
                            width:50,
                        },
                        {
                            title: '管内',
                            dataIndex: 'col2_1_2',
                            key: 'col2_1_2',
                            align: 'center',
                            width:50,
                        }
                    ]
                },
                {
                    title: '吹灰效果',
                    children: [
                        {
                            title: '吹灰前/后排烟温度，℃',
                            dataIndex: 'col2_2_1',
                            key: 'col2_2_1',
                            align: 'center',
                        }
                    ]
                },
                {
                    title: '积灰情况及吹灰原因',
                    dataIndex: 'col2_3',
                    key: 'col2_3',
                    align: 'center',
                },
                {
                    title: '吹灰器',
                    children: [
                        {
                            title: '声波',
                            dataIndex: 'col2_4_1',
                            key: 'col2_4_1',
                            align: 'center',
                            width:25,
                        },
                        {
                            title: '蒸汽',
                            dataIndex: 'col2_4_2',
                            key: 'col2_4_2',
                            align: 'center',
                            width:25,
                        },
                        {
                            title: '其他',
                            dataIndex: 'col2_4_3',
                            key: 'col2_4_3',
                            align: 'center',
                            width:25,
                        },
                        {
                            title: '不使用',
                            dataIndex: 'col2_4_4',
                            key: 'col2_4_4',
                            align: 'center',
                            width:25,
                        },
                    ]
                },
                {
                    title: '是否化学清洗',
                    dataIndex: 'col2_5',
                    key: 'col2_5',
                    align: 'center',
                },
                {
                    title: '化学清洗效果',
                    dataIndex: 'col2_6',
                    key: 'col2_6',
                    align: 'center',
                },
                {
                    title: '效果维持时间',
                    dataIndex: 'col2_7',
                    key: 'col2_7',
                    align: 'center',
                }
            ],
        },
        {
            title: '对流段炉管故障类型、部位及原因分析',
            children: [
                {
                    title: '炉管过热',
                    dataIndex: 'col3_1',
                    key: 'col3_1',
                    align: 'center',
                    width:25,
                },
                {
                    title: '炉管开裂',
                    dataIndex: 'col3_2',
                    key: 'col3_2',
                    align: 'center',
                    width:25,
                },
                {
                    title: '积灰严重',
                    dataIndex: 'col3_3',
                    key: 'col3_3',
                    align: 'center',
                    width:25,
                },
                {
                    title: 'ss带水',
                    dataIndex: 'col3_4',
                    key: 'col3_4',
                    align: 'center',
                    width:25,
                },
                {
                    title: '管内结垢',
                    dataIndex: 'col3_5',
                    key: 'col3_5',
                    align: 'center',
                    width:25,
                },
                {
                    title: '堵塞',
                    dataIndex: 'col3_6',
                    key: 'col3_6',
                    align: 'center',
                    width:25,
                },
                {
                    title: '集合管故障',
                    dataIndex: 'col3_7',
                    key: 'col3_7',
                    align: 'center',
                    width:25,
                },
                {
                    title: '弯头开裂',
                    dataIndex: 'col3_8',
                    key: 'col3_8',
                    align: 'center',
                    width:25,
                },
                {
                    title: '弯头穿孔',
                    dataIndex: 'col3_9',
                    key: 'col3_9',
                    align: 'center',
                    width:25,
                },
                {
                    title: '腐蚀',
                    dataIndex: 'col3_10',
                    key: 'col3_10',
                    align: 'center',
                    width:25,
                },
                {
                    title: '其它',
                    dataIndex: 'col3_11',
                    key: 'col3_11',
                    align: 'center',
                    width:25,
                },
                {
                    title: '发生部位(按照故障发生类型分开)',
                    dataIndex: 'col3_12',
                    key: 'col3_12',
                    align: 'center',
                },
                {
                    title: '原因分析(按照故障发生类型分析原因)',
                    dataIndex: 'col3_13',
                    key: 'col3_13',
                    align: 'center',
                },
            ],
        }
    ];


    const reactorStatusTable = [
        {
            col1: 'BA1101',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA1102',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA1103',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA1104',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA105',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA106',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA107',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA108',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA109',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA110',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA111',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA112',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA113',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA114',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },
        {
            col1: 'BA115',
            col2_1_1: '',
            col2_1_2: '√',
            col2_2_1: '/',
            col2_3: '',
            col2_4_1: '',
            col2_4_2: '√',
            col2_4_3: '',
            col2_4_4: '',
            col2_5: '是',
            col2_6: '好',
            col2_7: '3个月',
            col3_1: '',
            col3_2: '',
            col3_3: '',
            col3_4: '',
            col3_5: '',
            col3_6: '',
            col3_7: '',
            col3_8: '',
            col3_9: '',
            col3_10: '√',
            col3_11: '',
            col3_12: '  原料预热段水平段底部/  /  /',
            col3_13: '积液腐蚀',
        },

    ];
    const reactorComment = [    ];

    let comment = reactorComment;
    let tableHeader = reactorStatusHeader;
    let tableContent = reactorStatusTable;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState(reactorComment);


    return (
        <PageContainer>
            <Card style={{height: 1000}} bodyStyle={{paddingTop: 72}}>
                <Table
                    columns={tableHeader}
                    dataSource={tableContent}
                    size="small"
                    pagination={{size: 'small', position: ['bottomCenter'], pageSize: 20}}
                    scroll={{x: 1300}}
                />
                <div>
                    {comment}
                </div>
            </Card>
        </PageContainer>
    );
}
;


