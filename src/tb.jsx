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
            width: 70, ...getColumnSearchProps('col1'),
        },
        {
            title: '炉管构型',
            dataIndex: 'col2',
            key: 'col2',
            align: 'center',
            width: 70, ...getColumnSearchProps('col2'),
        },
        {
            title: '组数',
            dataIndex: 'col3',
            key: 'col3',
            align: 'center',
            width: 70, ...getColumnSearchProps('col3'),
        },
        {
            title: ' 排列方式 ',
            children:
                [{
                    title: '单排',
                    dataIndex: 'col4',
                    key: 'col4',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col4'),
                },
                    {
                        title: '双排',
                        dataIndex: 'col5',
                        key: 'col5',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col5'),
                    },
                    {
                        title: '错排',
                        dataIndex: 'col6',
                        key: 'col6',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col6'),
                    },
                ]
        },
        {
            title: '全炉投用或更新时间',
            dataIndex: 'col7',
            key: 'col7',
            align: 'center',
            width: 70, ...getColumnSearchProps('col7'),
        },
        {
            title: '炉管实际使用寿命',
            dataIndex: 'col8',
            key: 'col8',
            align: 'center',
            width: 70, ...getColumnSearchProps('col8'),
        },
        {
            title: '更换方式',
            children:
                [{
                    title: '全炉',
                    dataIndex: 'col9',
                    key: 'col9',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col9'),
                },
                    {
                        title: '整组',
                        dataIndex: 'col10',
                        key: 'col10',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col10'),
                    },
                    {
                        title: '单根',
                        dataIndex: 'col11',
                        key: 'col11',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col11'),
                    },
                    {
                        title: '其它',
                        dataIndex: 'col12',
                        key: 'col12',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col12'),
                    },
                ]
        },
        {
            title: '全炉或整组更换时炉管安装进炉膛方式',
            children:
                [

                    {
                        title: '以上三种情况占比（%/%/%)',
                        dataIndex: 'col13',
                        key: 'col13',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col13'),
                    },
                    {
                        title: '炉底',
                        dataIndex: 'col14',
                        key: 'col14',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col14'),
                    },
                    {
                        title: '炉顶',
                        dataIndex: 'col15',
                        key: 'col15',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col15'),
                    },
                    {
                        title: '端墙',
                        dataIndex: 'col16',
                        key: 'col16',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col16'),
                    },
                    {
                        title: '作业门',
                        dataIndex: 'col17',
                        key: 'col17',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col17'),
                    },
                    {
                        title: '其它',
                        dataIndex: 'col18',
                        key: 'col18',
                        align: 'center',
                        width: 70, ...getColumnSearchProps('col18'),
                    },
                ]
        },
        {
            title: '悬吊方式', children: [
                {
                    title: 'A-H吊架',
                    dataIndex: 'col19',
                    key: 'col19',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col19'),
                },
                {
                    title: '恒力弹簧',
                    dataIndex: 'col20',
                    key: 'col20',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col20'),
                },
                {
                    title: '平衡锤',
                    dataIndex: 'col21',
                    key: 'col21',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col21'),
                },
                {
                    title: '其它',
                    dataIndex: 'col22',
                    key: 'col22',
                    width: 70, ...getColumnSearchProps('col22'),
                },
            ]
        },
        {
            title: '悬吊运行中是否调整',
            children: [
                {
                    title: '是',
                    dataIndex: 'col23',
                    key: 'col23',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col23'),
                },
                {
                    title: '否',
                    dataIndex: 'col24',
                    key: 'col24',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col24'),
                },
            ]
        },
        {
            title: '炉管导向方式',
            children: [

                {
                    title: '无',
                    dataIndex: 'col25',
                    key: 'col25',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col25'),
                },
                {
                    title: '导向槽',
                    dataIndex: 'col26',
                    key: 'col26',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col26'),
                },
                {
                    title: '导向孔',
                    dataIndex: 'col27',
                    key: 'col27',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col27'),
                },
                {
                    title: '其他',
                    dataIndex: 'col28',
                    key: 'col28',
                    align: 'center',
                    width: 70, ...getColumnSearchProps('col28'),
                },
            ]
        }
    ];


    const reactorStatusTable = [];
    const reactorComment = [];

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


