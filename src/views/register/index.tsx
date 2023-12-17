import SwitchDark from "@/components/SwitchDark";
import loginLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.png";
import "./index.less";
import { useTranslation } from "react-i18next";
import RegisterForm from "@/views/register/components/RegisterForm";

const Register = () => {
	const { t } = useTranslation();
	return (
		<div className="register-container">
			<SwitchDark />
			<div className="register-box">
				<div className="register-left">
					<img src={loginLeft} alt="register" />
				</div>
				<div className="register-form">
					<div className="register-logo">
						<img className="register-icon" src={logo} alt="logo" />
						<span className="register-text">{t("register.confirm")}</span>
					</div>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
};

export default Register;
