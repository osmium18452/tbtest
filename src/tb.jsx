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
            title: '原料名称',
            dataIndex: 'col1',
            key: 'col1',
            align: 'center',
            fixed: 'left',
            width: 70,
            ...getColumnSearchProps('col1'),
        },
        {
            title: '拔头油',
            dataIndex: 'col2',
            key: 'col2',
            align: 'center',
            fixed: 'left',
            width: 70,
            ...getColumnSearchProps('col2'),
        },
        {
            title: '抽余油',
            dataIndex: 'col3',
            key: 'col3',
            align: 'center',
            fixed: 'left',
            width: 70,
            ...getColumnSearchProps('col3'),
        },
        {
            title: '其他',
            dataIndex: 'col4',
            key: 'col4',
            align: 'center',
            fixed: 'left',
            width: 70,
            ...getColumnSearchProps('col4'),
        },
        {
            title: '',
            dataIndex: 'col5',
            key: 'col5',
            align: 'center',
            fixed: 'left',
            width: 70,
            ...getColumnSearchProps('col5'),
        },
    ];


    const reactorStatusTable = [
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


