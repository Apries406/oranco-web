import { useState } from 'react';
import styles from './index.module.css';
import { useUserStore } from '../../store/user';
import { useNavigate } from 'react-router';
import { createDoc } from '../../api/docs';

export default function HomePage() {
	const [searchTerm, setSearchTerm] = useState('');
	const navigator = useNavigate();
	const isLogin = useUserStore((state) => state.isLogin);
	const user = useUserStore((state) => state.user);
	const token = useUserStore((state) => state.token);
	const documents = [
		{
			id: 1,
			title: '人工智能助力新药研发',
			author: 'Captain',
			date: '2024-12-03',
			type: '分享',
		},
		{
			id: 2,
			title: '离职申请',
			author: '云文档助手',
			date: '2024-11-23',
			type: '模板',
		},
		{
			id: 3,
			title: '服务端渲染 (SSR) 与前后端同构技术原理揭秘',
			author: '合一',
			date: '2024-09-30',
			type: '分享',
		},
		// Add more documents as needed
	];

	async function handleCreateDocument() {
		if (token === '' || !token) {
			alert('请先登录');
			return;
		}

		const res = await createDoc(token);
		console.log(res);
		navigator(`/document/${res.data.data.documentId}`);
	}

	return (
		<div className={styles.container}>
			{/* Left Sidebar */}
			<aside className={styles.sidebar}>
				<div className={styles.searchBox}>
					<input
						type='text'
						placeholder='搜索'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<nav className={styles.navigation}>
					<a
						href='#'
						className={styles.navItemActive}>
						主页
					</a>
					<a
						href='#'
						className={styles.navItem}>
						云盘
					</a>
					<a
						href='#'
						className={styles.navItem}>
						知识库
					</a>
				</nav>
			</aside>

			{/* Main Content */}
			<main className={styles.mainContent}>
				<div className={styles.header}>
					<div className={styles.headerDesc}>
						<h1>主页</h1>
						{isLogin ? (
							<h1>欢迎，{user?.username}</h1>
						) : (
							<button onClick={() => navigator('/login')}>登录</button>
						)}
					</div>
					<div className={styles.actions}>
						<button
							className={styles.actionButton}
							onClick={handleCreateDocument}>
							新建
							<span className={styles.buttonDesc}>新建文档开始协作</span>
						</button>
						<button className={styles.actionButton}>
							上传
							<span className={styles.buttonDesc}>上传本地文件</span>
						</button>
						<button className={styles.actionButton}>
							模板库
							<span className={styles.buttonDesc}>选择模板快速新建</span>
						</button>
					</div>
				</div>

				<div className={styles.filters}>
					<div className={styles.filterGroup}>
						<span className={styles.filterActive}>最近访问</span>
						<span>与我共享</span>
						<span>收藏</span>
					</div>
					<div className={styles.filterOptions}>
						<select className={styles.select}>
							<option>所有类型</option>
						</select>
						<select className={styles.select}>
							<option>不限时间</option>
						</select>
					</div>
				</div>

				<div className={styles.documentList}>
					{documents.map((doc) => (
						<div
							key={doc.id}
							className={styles.documentItem}>
							<div className={styles.documentIcon}>📄</div>
							<div className={styles.documentInfo}>
								<div className={styles.documentTitle}>
									{doc.title}
									<span className={styles.documentType}>{doc.type}</span>
								</div>
								<div className={styles.documentMeta}>
									<span>{doc.author}</span>
									<span>{doc.date}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
