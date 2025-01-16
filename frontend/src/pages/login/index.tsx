import { useState } from 'react';
import styles from './index.module.css';
import { userLogin } from '../../api/user';
import { useUserStore } from '../../store/user';
import { useNavigate } from 'react-router';

export default function LoginPage() {
	const navigator = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const setInitValue = useUserStore((state) => state.setInit);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await userLogin({ email, password });
		if (res.data.data) {
			setInitValue(res.data.data);
			// 跳转到首页
			navigator('/');
		} else {
			alert('登录失败，请检查邮箱和密码是否正确');
		}
	};

	return (
		<div className={styles.container}>
			<form
				className={styles.loginForm}
				onSubmit={handleSubmit}>
				<h1 className={styles.title}>Login</h1>
				<div className={styles.inputGroup}>
					<label htmlFor='email'>邮箱地址</label>
					<input
						type='text'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type='submit'
					className={styles.loginButton}>
					登录
				</button>
			</form>
		</div>
	);
}
