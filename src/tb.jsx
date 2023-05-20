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


    const reactorStatusHeader =[
        {title: '位号',dataIndex: 'col1',key: 'col1',align: 'center',width: 120,fixed:'left',...getColumnSearchProps('col1'),},
        {title:'DS（稀释蒸汽）',children:[
                {title:'类型',children:[
        {title: 'globe',dataIndex: 'col2',key: 'col2',align: 'center',width: 70,...getColumnSearchProps('col2'),},
        {title: 'ECC',dataIndex: 'col3',key: 'col3',align: 'center',width: 70,...getColumnSearchProps('col3'),},
        {title: '其它',dataIndex: 'col4',key: 'col4',align: 'center',width: 70,...getColumnSearchProps('col4'),},
                    ]},
                {title:'材质',children:[
        {title: '阀体',dataIndex: 'col5',key: 'col5',align: 'center',width: 180,...getColumnSearchProps('col5'),},
        {title: '内件',dataIndex: 'col6',key: 'col6',align: 'center',width: 70,...getColumnSearchProps('col6'),},
                    ]},
        {title: '使用周期',dataIndex: 'col7',key: 'col7',align: 'center',width: 100,...getColumnSearchProps('col7'),},
        {title: '型号',dataIndex: 'col8',key: 'col8',align: 'center',width: 70,...getColumnSearchProps('col8'),},
        {title: '生产厂家',dataIndex: 'col9',key: 'col9',align: 'center',width: 100,...getColumnSearchProps('col9'),},
        {title: '存在问题及对策',dataIndex: 'col10',key: 'col10',align: 'center',width: 180,...getColumnSearchProps('col10'),},
            ]},
    ];


    let nameshow = 'infotable5_1';
    const [reactorStatusTable, setReactorStatusTable] = useState([]);

    const reactorComment = [];

    let comment = reactorComment;
    let tableHeader = reactorStatusHeader;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState(reactorComment);

    const host = "http://10.176.26.86:20127";
    // const host = '';
    const url = host + '/infobase/tables/infotable20_6';
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
                pagination={{size: 'small', position: ['bottomCenter'], pageSize: 80}}
                scroll={{x: 500}}
            />
            <div>
                {comment}
            </div>
        </Card>
    </PageContainer>);
};


