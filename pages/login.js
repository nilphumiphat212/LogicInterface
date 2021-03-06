import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
    Card,
    Button,
    Row,
    Col,
    Input,
    Image,
} from 'antd';
import {
    UserOutlined,
    KeyOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import { successAlert, warningAlert } from '../utils/alert';
import { isNullOrEmpty } from '../utils/general';

export default function index() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    function usernameHandle(e) {
        setUsername(e.target.value);
    }

    function passwordHandle(e) {
        setPassword(e.target.value);
    }

    function login() {
        if (isNullOrEmpty(username) || isNullOrEmpty(password))
            warningAlert('ชื่อผู้ใช้หรือรหัสผ่านว่างเปล่า โปรดใส่ให้ครบถ้วน');
        else router.push('/main');
    }

    function enterHandle(e) {
        if (e.keyCode === 13) {
            if ((isNullOrEmpty(username) && isNullOrEmpty(password)) || (isNullOrEmpty(username) && !isNullOrEmpty(password))) {
                usernameRef.current.focus();
            } else if (!isNullOrEmpty(username) && isNullOrEmpty(password)) {
                passwordRef.current.focus();
            } // else if (!isNullOrEmpty(username) && !isNullOrEmpty(password)) login();
        }
    }

    return <>
        <Row type="flex" className="d-flex flex-col h-100 justify-content-center align-items-center">
            <Col>
                <Card title="LOGIC INTERFACE" style={{ textAlign: 'center', width: '350px' }}>
                    <br></br>
                    <Input addonBefore={<UserOutlined />} ref={usernameRef} placeholder="username" onChange={(e) => usernameHandle(e)} onKeyDown={(e) => enterHandle(e)} />
                    <br></br><br></br>
                    <Input type="password" addonBefore={<KeyOutlined />} ref={passwordRef} placeholder="password" onChange={(e) => passwordHandle(e)} onKeyDown={(e) => enterHandle(e)} />
                    <br></br><br></br>
                    <Button type="primary" icon={<LoginOutlined />} onClick={login}>Login</Button>
                    <br></br>
                </Card>
            </Col>
        </Row>
    </>
}