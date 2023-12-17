import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Register } from "@/api/interface";
import { registerApi } from "@/api/modules/user";
import { LOGIN_UTL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { setTabsList } from "@/redux/modules/tabs/action";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { encrypt } from "@/utils/rsa";

const RegisterForm = (props: any) => {
	const { t } = useTranslation();
	const { setToken, setTabsList } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (registerForm: Register.ReqRegisterForm) => {
		try {
			setLoading(true);
			const rsaPassword = encrypt(registerForm.password);
			if (rsaPassword === false) {
				message.error("注册失败!");
				return;
			}
			registerForm.password = rsaPassword;
			const { data } = await registerApi(registerForm);
			setToken(data);
			setTabsList([]);
			message.success("注册成功！");
			navigate(LOGIN_UTL);
		} finally {
			setLoading(false);
		}
	};

	const jumpLogin = () => {
		navigate(LOGIN_UTL);
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
			<Form.Item className="register-btn">
				<Button type="primary" htmlType="button" onClick={() => jumpLogin()}>
					{t("login.confirm")}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("register.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setTabsList };
export default connect(null, mapDispatchToProps)(RegisterForm);
