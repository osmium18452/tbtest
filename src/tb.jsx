import React, {useEffect, useState} from 'react';
import {Button, Card, Input, Space, Table} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import {get} from './gt';

moment.locale('en-NZ');

export default () => {
// 自定义筛选菜单 + 表格
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (<div style={{padding: 8}}>
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
        </div>),
        filterIcon: (filtered) => (<SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>),
        onFilter: (value, record) => record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        render: (text) => searchedColumn === dataIndex ? (<Highlighter
            highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
        />) : (text),
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
        {
            title: '位号 ',
            dataIndex: 'col1',
            key: 'col1',
            align: 'center',
            width: 120,
            fixed: 'left', ...getColumnSearchProps('col1'),
        },
        {
            title: '预热器台数及型号',
            dataIndex: 'col2',
            key: 'col2',
            align: 'center',
            width: 180, ...getColumnSearchProps('col2'),
        },
        {
            title: '加热介质情况', children: [
                {
                    title: '介质名称', children: [
                        {
                            title: 'LS ',
                            dataIndex: 'col3',
                            key: 'col3',
                            align: 'center',
                            width: 100, ...getColumnSearchProps('col3'),
                        },
                        {
                            title: '凝液',
                            dataIndex: 'col4',
                            key: 'col4',
                            align: 'center',
                            width: 70, ...getColumnSearchProps('col4'),
                        },
                        {
                            title: '急冷水',
                            dataIndex: 'col5',
                            key: 'col5',
                            align: 'center',
                            width: 80, ...getColumnSearchProps('col5'),
                        },
                        {
                            title: '其它',
                            dataIndex: 'col6',
                            key: 'col6',
                            align: 'center',
                            width: 70, ...getColumnSearchProps('col6'),
                        },
                    ]
                },
                {
                    title: '入/出口温度', children: [
                        {
                            title: '℃',
                            dataIndex: 'col7',
                            key: 'col7',
                            align: 'center',
                            width: 120, ...getColumnSearchProps('col7'),
                        },
                    ]
                },
                {
                    title: '流量', children: [
                        {
                            title: 't/h',
                            dataIndex: 'col8',
                            key: 'col8',
                            align: 'center',
                            width: 70, ...getColumnSearchProps('col8'),
                        },
                    ]
                },
            ]
        },
        {
            title: '空气预热后温度，℃', children: [
                {
                    title: '冬季',
                    dataIndex: 'col9',
                    key: 'col9',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col9'),
                },
                {
                    title: '夏季',
                    dataIndex: 'col10',
                    key: 'col10',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col10'),
                },
                {
                    title: '其他',
                    dataIndex: 'col11',
                    key: 'col11',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col11'),
                },
            ]
        },
        {
            title: '投用后节约燃料', children: [
                {
                    title: 'kg/h',
                    dataIndex: 'col12',
                    key: 'col12',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col12'),
                },
                {
                    title: '%',
                    dataIndex: 'col13',
                    key: 'col13',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col13'),
                },
            ]
        },
        {
            title: '投用前/后排烟温度', children: [
                {
                    title: '℃',
                    dataIndex: 'col14',
                    key: 'col14',
                    align: 'center',
                    width: 180, ...getColumnSearchProps('col14'),
                },
            ]
        },
        {
            title: '投用后燃烧器风门是否变化', children: [
                {
                    title: '是',
                    dataIndex: 'col15',
                    key: 'col15',
                    align: 'center',
                    width: 100, ...getColumnSearchProps('col15'),
                },
                {
                    title: '否',
                    dataIndex: 'col16',
                    key: 'col16',
                    align: 'center',
                    width: 100, ...getColumnSearchProps('col16'),
                },
            ]
        },
        {
            title: '投用时间',
            dataIndex: 'col17',
            key: 'col17',
            align: 'center',
            width: 100, ...getColumnSearchProps('col17'),
        },
        {
            title: '进风口朝向', children: [
                {
                    title: '上',
                    dataIndex: 'col18',
                    key: 'col18',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col18'),
                },
                {
                    title: '侧',
                    dataIndex: 'col19',
                    key: 'col19',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col19'),
                },
                {
                    title: '下',
                    dataIndex: 'col20',
                    key: 'col20',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col20'),
                },
            ]
        },
        {
            title: '是否设置过滤器', children: [
                {
                    title: '是',
                    dataIndex: 'col21',
                    key: 'col21',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col21'),
                },
                {
                    title: '否',
                    dataIndex: 'col22',
                    key: 'col22',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col22'),
                },
            ]
        },
        {
            title: '吹扫频次，次/年',
            dataIndex: 'col23',
            key: 'col23',
            align: 'center',
            width: 150, ...getColumnSearchProps('col23'),
        },
        {
            title: '投用前/后炉底负压值', children: [
                {
                    title: 'mmH2O',
                    dataIndex: 'col24',
                    key: 'col24',
                    align: 'center',
                    width: 150, ...getColumnSearchProps('col24'),
                },
            ]
        },
        {
            title: '发生泄漏情况', children: [
                {
                    title: '是',
                    dataIndex: 'col25',
                    key: 'col25',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col25'),
                },
                {
                    title: '否',
                    dataIndex: 'col26',
                    key: 'col26',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col26'),
                },
            ]
        },
        {
            title: '存在问题及对策（如增加预热器后燃烧器如何调节）',
            dataIndex: 'col27',
            key: 'col27',
            align: 'center',
            width: 240, ...getColumnSearchProps('col27'),
        }
    ];


    let nameshow = 'infotable5_1';
    const [reactorStatusTable, setReactorStatusTable] = useState([]);

    const reactorComment = [];

    let comment = reactorComment;
    let tableHeader = reactorStatusHeader;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState(reactorComment);

    const host = "http://ys.nuclearsilo.me:8080/";
    // const host = '';
    const url = host + '/infobase/tables/infotable10_1';
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(url);
            res.json().then(res => setReactorStatusTable(res));
            // console.log(res);
        }

        fetchData();
    })
    // fetch(url).then(res => res.json()).then(data => {
    //     console.log(url)
    //     setReactorStatusTable(data);
    //     console.log(data);
    // })


    return (<PageContainer>
        <Card style={{height: 1000}} bodyStyle={{paddingTop: 72}}>
            <Table
                columns={tableHeader}
                dataSource={reactorStatusTable}
                size="small"
                bordered
                pagination={{size: 'small', position: ['bottomCenter'], pageSize: 20}}
                scroll={{x: 500}}
            />
            <div>
                {comment}
            </div>
        </Card>
    </PageContainer>);
};


