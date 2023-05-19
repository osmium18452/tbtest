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
        {title: '位号',dataIndex: 'col1',key: 'col1',align: 'center',fixed:'left',width: 120,...getColumnSearchProps('col1'),},
        {title:'减温器',align:'center',children:[
        {title:'减温器本体及安装形式',align:'center',children:[
                {title:'类型',align:'center',children:[
                        {title: '一体',dataIndex: 'col2',key: 'col2',align: 'center',width: 70,...getColumnSearchProps('col2'),},
                        {title: '分体',dataIndex: 'col3',key: 'col3',align: 'center',width: 70,...getColumnSearchProps('col3'),},
                    ]},
                {title:'插入式',align:'center',children:[
                        {title: '喷嘴',dataIndex: 'col4',key: 'col4',align: 'center',width: 70,...getColumnSearchProps('col4'),},
                    ]},
                {title:'在线式',align:'center',children:[
                        {title: '可变面积',dataIndex: 'col5',key: 'col5',align: 'center',width: 100,...getColumnSearchProps('col5'),},
                        {title: '文丘里',dataIndex: 'col6',key: 'col6',align: 'center',width: 80,...getColumnSearchProps('col6'),},
                        {title: '其他',dataIndex: 'col7',key: 'col7',align: 'center',width: 70,...getColumnSearchProps('col7'),},
                        {title: '安装方式',dataIndex: 'col8',key: 'col8',align: 'center',width: 100,...getColumnSearchProps('col8'),},
                    ]},
                {title:'减温器本体',align:'center',children:[
                        {title: '材质',dataIndex: 'col9',key: 'col9',align: 'center',width: 70,...getColumnSearchProps('col9'),},
                        {title: '型号',dataIndex: 'col10',key: 'col10',align: 'center',width: 100,...getColumnSearchProps('col10'),},
                        {title: '生产厂家',dataIndex: 'col11',key: 'col11',align: 'center',width: 300,...getColumnSearchProps('col11'),},
                    ]},
                {title:'水阀',align:'center',children:[
                        {title: '型号',dataIndex: 'col12',key: 'col12',align: 'center',width: 70,...getColumnSearchProps('col12'),},
                        {title: '生产厂家',dataIndex: 'col13',key: 'col13',align: 'center',width: 100,...getColumnSearchProps('col13'),},
                    ]},
                {title: '投用年月',dataIndex: 'col14',key: 'col14',align: 'center',width: 100,...getColumnSearchProps('col14'),},
            ]},
        {title: '存在问题及对策',dataIndex: 'col15',key: 'col15',align: 'center',width: 180,...getColumnSearchProps('col15'),},
            ]},
        {title:'液体原料料流量仪表',align:'center',children:[
                {title:'',align:'center',children:[
                        {title:'高温（是否带旁路）',align:'center',children:[
        {title: '是',dataIndex: 'col16',key: 'col16',align: 'center',width: 90,...getColumnSearchProps('col16'),},
        {title: '否',dataIndex: 'col17',key: 'col17',align: 'center',width: 90,...getColumnSearchProps('col17'),},
                            ]},
                        {title:'普通（是否带旁路）',align:'center',children:[
        {title: '是',dataIndex: 'col18',key: 'col18',align: 'center',width: 90,...getColumnSearchProps('col18'),},
        {title: '否',dataIndex: 'col19',key: 'col19',align: 'center',width: 90,...getColumnSearchProps('col19'),},
                            ]},
        {title: '型号',dataIndex: 'col20',key: 'col20',align: 'center',width: 150,...getColumnSearchProps('col20'),},
        {title: '生产厂家',dataIndex: 'col21',key: 'col21',align: 'center',width: 150,...getColumnSearchProps('col21'),},
        {title: '存在问题及建议',dataIndex: 'col22',key: 'col22',align: 'center',width: 180,...getColumnSearchProps('col22'),},
                    ]},
                {title:'',align:'center',children:[
                        {title:'高温（是否带旁路）',align:'center',children:[
        {title: '是',dataIndex: 'col23',key: 'col23',align: 'center',width: 90,...getColumnSearchProps('col23'),},
        {title: '否',dataIndex: 'col24',key: 'col24',align: 'center',width: 90,...getColumnSearchProps('col24'),},
                            ]},
                        {title:'普通（是否带旁路）',align:'center',children:[
        {title: '是',dataIndex: 'col25',key: 'col25',align: 'center',width: 90,...getColumnSearchProps('col25'),},
        {title: '否',dataIndex: 'col26',key: 'col26',align: 'center',width: 90,...getColumnSearchProps('col26'),},
                            ]},
        {title: '型号',dataIndex: 'col27',key: 'col27',align: 'center',width: 70,...getColumnSearchProps('col27'),},
        {title: '生产厂家',dataIndex: 'col28',key: 'col28',align: 'center',width: 100,...getColumnSearchProps('col28'),},
        {title: '存在问题及对策',dataIndex: 'col29',key: 'col29',align: 'center',width: 180,...getColumnSearchProps('col29'),},
                    ]},
            ]},
    ]


    let nameshow = 'infotable5_1';
    const [reactorStatusTable, setReactorStatusTable] = useState([]);

    const reactorComment = [];

    let comment = reactorComment;
    let tableHeader = reactorStatusHeader;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState(reactorComment);

    const host = "http://10.176.26.86:20127";
    // const host = '';
    const url = host + '/infobase/tables/infotable19_1';
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


