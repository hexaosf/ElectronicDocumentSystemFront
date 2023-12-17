import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/user";
import { HOME_URL, REGISTER_UTL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { setTabsList } from "@/redux/modules/tabs/action";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { encrypt } from "@/utils/rsa";

const LoginForm = (props: any) => {
	const { t } = useTranslation();
	const { setToken, setTabsList } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			const rsaPassword = encrypt(loginForm.password);
			if (rsaPassword === false) {
				message.error("登陆失败!");
				return;
			}
			loginForm.password = rsaPassword;
			const { data } = await loginApi(loginForm);
			setToken(data);
			setTabsList([]);
			message.success("登录成功！");
			navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};

	// 跳转注册
	const jumpRegister = () => {
		navigate(REGISTER_UTL);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入4-8位用户名", pattern: /^[a-zA-Z0-9]{4,8}$/ }]}>
				<Input placeholder="请输入用户名" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入8-20位密码", pattern: /^[a-zA-Z0-9]{8,20}$/ }]}>
				<Input.Password autoComplete="new-password" placeholder="请输入密码" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button type="primary" htmlType="button" onClick={() => jumpRegister()}>
					{t("register.confirm")}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setTabsList };
export default connect(null, mapDispatchToProps)(LoginForm);
