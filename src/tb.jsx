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


    const reactorStatusHeader = [{
        title: '位号',
        dataIndex: 'col1',
        key: 'col1',
        align: 'center',
        width: 120,
        fixed: 'left', ...getColumnSearchProps('col1'),
    }, {
        title: '结焦抑制技术',
        children: [{
            title: '投用时间',
            dataIndex: 'col2',
            key: 'col2',
            align: 'center',
            width: 100, ...getColumnSearchProps('col2'),
        }, {
            title: '技术提供商',
            dataIndex: 'col3',
            key: 'col3',
            align: 'center',
            width: 120, ...getColumnSearchProps('col3'),
        }, {
            title: '结焦抑制剂种类',
            dataIndex: 'col4',
            key: 'col4',
            align: 'center',
            width: 160, ...getColumnSearchProps('col4'),
        }, {
            title: '注入位置',
            dataIndex: 'col5',
            key: 'col5',
            align: 'center',
            width: 140, ...getColumnSearchProps('col5'),
        }, {
            title: '简要评价及存在问题',
            dataIndex: 'col6',
            key: 'col6',
            align: 'center',
            width: 180, ...getColumnSearchProps('col6'),
        }, {
            title: '其它结焦抑制技术应用说明',
            children: [{
                title: '提供商',
                dataIndex: 'col7',
                key: 'col7',
                align: 'center',
                width: 80, ...getColumnSearchProps('col7'),
            }, {
                title: '说明 ',
                dataIndex: 'col8',
                key: 'col8',
                align: 'center',
                width: 70, ...getColumnSearchProps('col8'),
            },]
        },]
    }, {
        title: '炉墙高效涂层技术（增加炉墙表面黑度）',
        children: [{
            title: '投用时间',
            dataIndex: 'col9',
            key: 'col9',
            align: 'center',
            width: 100, ...getColumnSearchProps('col9'),
        }, {
            title: '技术提供商',
            dataIndex: 'col10',
            key: 'col10',
            align: 'center',
            width: 100, ...getColumnSearchProps('col10'),
        }, {
            title: '涂料种类',
            dataIndex: 'col11',
            key: 'col11',
            align: 'center',
            width: 100, ...getColumnSearchProps('col11'),
        }, {
            title: '涂层位置',
            dataIndex: 'col12',
            key: 'col12',
            align: 'center',
            width: 100, ...getColumnSearchProps('col12'),
        }, {
            title: '简要评价及存在问题',
            dataIndex: 'col13',
            key: 'col13',
            align: 'center',
            width: 180, ...getColumnSearchProps('col13'),
        },]
    }, {
        title: '炉膛辐射元件技术（增强辐射传热技术）',
        children: [{
            title: '投用时间',
            dataIndex: 'col14',
            key: 'col14',
            align: 'center',
            width: 100, ...getColumnSearchProps('col14'),
        }, {
            title: '技术提供商',
            dataIndex: 'col15',
            key: 'col15',
            align: 'center',
            width: 120, ...getColumnSearchProps('col15'),
        }, {
            title: '元件几何结构',
            dataIndex: 'col16',
            key: 'col16',
            align: 'center',
            width: 130, ...getColumnSearchProps('col16'),
        }, {
            title: '生根位置',
            dataIndex: 'col17',
            key: 'col17',
            align: 'center',
            width: 100, ...getColumnSearchProps('col17'),
        }, {
            title: '简要评价及存在问题',
            dataIndex: 'col18',
            key: 'col18',
            align: 'center',
            width: 180, ...getColumnSearchProps('col18'),
        },]
    }, {
        title: '裂解炉管外涂层技术',
        children: [{
            title: '投用时间',
            dataIndex: 'col19',
            key: 'col19',
            align: 'center',
            width: 100, ...getColumnSearchProps('col19'),
        }, {
            title: '技术提供商',
            dataIndex: 'col20',
            key: 'col20',
            align: 'center',
            width: 120, ...getColumnSearchProps('col20'),
        }, {
            title: '涂层类型',
            dataIndex: 'col21',
            key: 'col21',
            align: 'center',
            width: 100, ...getColumnSearchProps('col21'),
        }, {
            title: '简要评价及存在问题',
            dataIndex: 'col22',
            key: 'col22',
            align: 'center',
            width: 180, ...getColumnSearchProps('col22'),
        },]
    }, {
        title: '裂解炉管内涂层技术',
        children: [{
            title: '投用时间',
            dataIndex: 'col23',
            key: 'col23',
            align: 'center',
            width: 100, ...getColumnSearchProps('col23'),
        }, {
            title: '技术提供商',
            dataIndex: 'col24',
            key: 'col24',
            align: 'center',
            width: 100, ...getColumnSearchProps('col24'),
        }, {
            title: '涂层类型',
            dataIndex: 'col25',
            key: 'col25',
            align: 'center',
            width: 100, ...getColumnSearchProps('col25'),
        }, {
            title: '简要评价及存在问题',
            dataIndex: 'col26',
            key: 'col26',
            align: 'center',
            width: 180, ...getColumnSearchProps('col26'),
        },]
    }, {
        title: '裂解炉收率预测软件',
        children: [{
            title: '投用时间',
            dataIndex: 'col27',
            key: 'col27',
            align: 'center',
            width: 100, ...getColumnSearchProps('col27'),
        }, {
            title: '技术提供商',
            dataIndex: 'col28',
            key: 'col28',
            align: 'center',
            width: 120, ...getColumnSearchProps('col28'),
        }, {
            title: '预测与标定收率偏差，%',
            dataIndex: 'col29',
            key: 'col29',
            align: 'center',
            width: 180, ...getColumnSearchProps('col29'),
        }, {
            title: '简要评价及存在问题',
            dataIndex: 'col30',
            key: 'col30',
            align: 'center',
            width: 180, ...getColumnSearchProps('col30'),
        },]
    }, {
        title: '新型材料炉管', children: [{
            title: '投用时间',
            dataIndex: 'col31',
            key: 'col31',
            align: 'center',
            width: 100, ...getColumnSearchProps('col31'),
        }, {
            title: '技术提供商',
            dataIndex: 'col32',
            key: 'col32',
            align: 'center',
            width: 120, ...getColumnSearchProps('col32'),
        }, {
            title: '炉管材料',
            dataIndex: 'col33',
            key: 'col33',
            align: 'center',
            width: 100, ...getColumnSearchProps('col33'),
        }, {
            title: '简要评价及存在问题',
            dataIndex: 'col34',
            key: 'col34',
            align: 'center',
            width: 180, ...getColumnSearchProps('col34'),
        },]
    },];


    let nameshow = 'infotable5_1';
    const [reactorStatusTable, setReactorStatusTable] = useState([]);

    const reactorComment = [];

    let comment = reactorComment;
    let tableHeader = reactorStatusHeader;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState(reactorComment);

    const host = "http://ys.nuclearsilo.me:8080/";
    // const host = '';
    const url = host + '/infobase/tables/infotable12_1';
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


