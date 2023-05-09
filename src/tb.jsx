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


    const reactorStatusHeader = [// sorter: (a, b) => a.value - b.value,
        //     ...getColumnSearchProps('col1'),
        {
            title: '位号',
            dataIndex: 'col1',
            key: 'col1',
            align: 'center',
            width: 120, ...getColumnSearchProps('col1'),
        },
        {
            title: '裂解原料',
            dataIndex: 'col2',
            key: 'col2',
            align: 'center',
            width: 120, ...getColumnSearchProps('col2'),
        },
        {
            title: '裂解炉目前情况（注1）', children: [
                {
                    title: '未改造',
                    dataIndex: 'col3',
                    key: 'col3',
                    align: 'center',
                    width: 90, ...getColumnSearchProps('col3'),
                },
                {
                    title: '改造',
                    dataIndex: 'col4',
                    key: 'col4',
                    align: 'center',
                    width: 90, ...getColumnSearchProps('col4'),
                },
            ]
        },
        {
            title: '投油量，kg/h',
            dataIndex: 'col5',
            key: 'col5',
            align: 'center',
            width: 150, ...getColumnSearchProps('col5'),
        },
        {
            title: '稀释蒸汽，kg/h',
            dataIndex: 'col6',
            key: 'col6',
            align: 'center',
            width: 170, ...getColumnSearchProps('col6'),
        },
        {
            title: '燃料量，kg/h ',
            dataIndex: 'col7',
            key: 'col7',
            align: 'center',
            width: 120, ...getColumnSearchProps('col7'),
        },
        {
            title: 'BFW流量，kg/h',
            dataIndex: 'col8',
            key: 'col8',
            align: 'center',
            width: 150, ...getColumnSearchProps('col8'),
        },
        {
            title: '进入裂解炉DS温度，℃', children: [
                {
                    title: '设计',
                    dataIndex: 'col9',
                    key: 'col9',
                    align: 'center',
                    width: 200, ...getColumnSearchProps('col9'),
                },
                {
                    title: '实际',
                    dataIndex: 'col10',
                    key: 'col10',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col10'),
                },
            ]
        },
        {
            title: 'DS过热后（如果有）温度，℃',
            children: [
                {
                    title: '设计',
                    dataIndex: 'col11',
                    key: 'col11',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col11'),
                },
                {
                    title: '实际',
                    dataIndex: 'col12',
                    key: 'col12',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col12'),
                },
            ]
        },
        {
            title: '蒸汽发生量，kg/h',
            dataIndex: 'col13',
            key: 'col13',
            align: 'center',
            width: 200, ...getColumnSearchProps('col13'),
        },
        {
            title: 'SS 过热后温度,℃',
            dataIndex: 'col14',
            key: 'col14',
            align: 'center',
            width: 200, ...getColumnSearchProps('col14'),
        },
        {
            title: '炉外壁平均温度，℃',
            dataIndex: 'col15',
            key: 'col15',
            align: 'center',
            width: 200, ...getColumnSearchProps('col15'),
        },
        {
            title: '运转周期，天', children: [
                {
                    title: '设计',
                    dataIndex: 'col16',
                    key: 'col16',
                    align: 'center',
                    width: 170, ...getColumnSearchProps('col16'),
                },
                {
                    title: '实际',
                    dataIndex: 'col17',
                    key: 'col17',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col17'),
                },
            ]
        },
        {
            title: '运转周期控制因素', children: [
                {
                    title: '炉管壁温',
                    dataIndex: 'col18',
                    key: 'col18',
                    align: 'center',
                    width: 200, ...getColumnSearchProps('col18'),
                },
                {
                    title: 'TLE出口温度',
                    dataIndex: 'col19',
                    key: 'col19',
                    align: 'center',
                    width: 150, ...getColumnSearchProps('col19'),
                },
                {
                    title: '文丘里压降',
                    dataIndex: 'col20',
                    key: 'col20',
                    align: 'center',
                    width: 150, ...getColumnSearchProps('col20'),
                },
                {
                    title: '生产计划',
                    dataIndex: 'col21',
                    key: 'col21',
                    align: 'center',
                    width: 120, ...getColumnSearchProps('col21'),
                },
            ]
        },
        {
            title: '是否预硫化', children: [
                {
                    title: '是',
                    dataIndex: 'col22',
                    key: 'col22',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col22'),
                },
                {
                    title: '否',
                    dataIndex: 'col23',
                    key: 'col23',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col23'),
                },
            ]
        },
        {
            title: '注硫剂类型',
            dataIndex: 'col24',
            key: 'col24',
            align: 'center',
            width: 150, ...getColumnSearchProps('col24'),
        },
        {
            title: '硫化物注入指标，PPM',
            dataIndex: 'col25',
            key: 'col25',
            align: 'center',
            width: 240, ...getColumnSearchProps('col25'),
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
    const url = host + '/infobase/tables/infotable7_1';
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
                pagination={{size: 'small', position: ['bottomCenter'], pageSize: 20}}
                scroll={{x: 1000}}
            />
            <div>
                {comment}
            </div>
        </Card>
    </PageContainer>);
};


