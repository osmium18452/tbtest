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
        {title: '位号',dataIndex: 'col1',key: 'col1',align: 'center',width: 120,fixed:'left',...getColumnSearchProps('col1'),},
        {title:'裂解气大阀型式',children:[
        {title: '单闸板',dataIndex: 'col2',key: 'col2',align: 'center',width: 80,...getColumnSearchProps('col2'),},
        {title: '双闸板',dataIndex: 'col3',key: 'col3',align: 'center',width: 80,...getColumnSearchProps('col3'),},
        {title: '蝶阀',dataIndex: 'col4',key: 'col4',align: 'center',width: 70,...getColumnSearchProps('col4'),},
        {title: '楔形阀',dataIndex: 'col5',key: 'col5',align: 'center',width: 80,...getColumnSearchProps('col5'),},
        {title: '其它',dataIndex: 'col6',key: 'col6',align: 'center',width: 70,...getColumnSearchProps('col6'),},
            ]},
        {title:'清焦阀型式',children:[
        {title: '单闸板',dataIndex: 'col7',key: 'col7',align: 'center',width: 80,...getColumnSearchProps('col8'),},
        {title: '双闸板',dataIndex: 'col8',key: 'col8',align: 'center',width: 80,...getColumnSearchProps('col9'),},
        {title: '蝶阀',dataIndex: 'col9',key: 'col9',align: 'center',width: 70,...getColumnSearchProps('col10'),},
        {title: '楔形阀',dataIndex: 'col10',key: 'col10',align: 'center',width: 80,...getColumnSearchProps('col11'),},
        {title: '其它',dataIndex: 'col11',key: 'col11',align: 'center',width: 70,...getColumnSearchProps('col12'),},
            ]},
        {title: '生产厂家',dataIndex: 'col12',key: 'col12',align: 'center',width: 100,...getColumnSearchProps('col13'),},
        {title:'裂解气大阀配制',children:[
        {title: '单阀',dataIndex: 'col13',key: 'col13',align: 'center',width: 70,...getColumnSearchProps('col14'),},
        {title: '双阀',dataIndex: 'col14',key: 'col14',align: 'center',width: 70,...getColumnSearchProps('col15'),},
            ]},
        {title:'清焦阀配制',children:[
        {title: '单阀',dataIndex: 'col15',key: 'col15',align: 'center',width: 70,...getColumnSearchProps('col16'),},
        {title: '双阀',dataIndex: 'col16',key: 'col16',align: 'center',width: 70,...getColumnSearchProps('col17'),},
            ]},
        {title:'防焦蒸汽种类及温度(℃)/压力(Mpa(G))',children:[
        {title: 'LS(温度/压力)',dataIndex: 'col17',key: 'col17',align: 'center',width: 150,...getColumnSearchProps('col18'),},
        {title: 'DS(温度/压力)',dataIndex: 'col18',key: 'col18',align: 'center',width: 150,...getColumnSearchProps('col19'),},
        {title: 'MS(温度/压力)',dataIndex: 'col19',key: 'col19',align: 'center',width: 150,...getColumnSearchProps('col20'),},
            ]},
        {title:'开/关一次用时',children:[
        {title: 'min',dataIndex: 'col20',key: 'col20',align: 'center',width: 120,...getColumnSearchProps('col21'),},
            ]},
        {title:'与清焦阀联动方式',children:[
        {title: '机械连接',dataIndex: 'col21',key: 'col21',align: 'center',width: 100,...getColumnSearchProps('col22'),},
        {title: '电子联锁',dataIndex: 'col22',key: 'col22',align: 'center',width: 100,...getColumnSearchProps('col23'),},
        {title: '手动',dataIndex: 'col23',key: 'col23',align: 'center',width: 70,...getColumnSearchProps('col24'),},
            ]},
        {title:'电子联锁压力联锁条件',children:[
        {title: '3取2',dataIndex: 'col24',key: 'col24',align: 'center',width: 70,...getColumnSearchProps('col25'),},
        {title: '2取2',dataIndex: 'col25',key: 'col25',align: 'center',width: 70,...getColumnSearchProps('col26'),},
        {title: '2取1',dataIndex: 'col26',key: 'col26',align: 'center',width: 70,...getColumnSearchProps('col27'),},
            ]},
        {title:'裂解气大阀是否全开才注入急冷油',children:[
        {title: '是',dataIndex: 'col27',key: 'col27',align: 'center',width: 70,...getColumnSearchProps('col28'),},
        {title: '否',dataIndex: 'col28',key: 'col28',align: 'center',width: 70,...getColumnSearchProps('col29'),},
            ]},
        {title: '大阀底部排液频率',dataIndex: 'col29',key: 'col29',align: 'center',width: 180,...getColumnSearchProps('col30'),},
        {title: '防焦蒸汽检查频率/巡查频率',dataIndex: 'col30',key: 'col30',align: 'center',width: 220,...getColumnSearchProps('col31'),},
        {title: '清焦时大阀前后控制压差，Mpa',dataIndex: 'col31',key: 'col31',align: 'center',width: 220,...getColumnSearchProps('col32'),},
        {title: '存在的问题及对策',dataIndex: 'col32',key: 'col32',align: 'center',width: 150,...getColumnSearchProps('col32'),},
    ]


    let nameshow = 'infotable5_1';
    const [reactorStatusTable, setReactorStatusTable] = useState([]);

    const reactorComment = [];

    let comment = reactorComment;
    let tableHeader = reactorStatusHeader;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState(reactorComment);

    const host = "http://ys.nuclearsilo.me:8080/";
    // const host = '';
    const url = host + '/infobase/tables/infotable13_1';
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


