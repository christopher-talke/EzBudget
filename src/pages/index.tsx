import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

import { formatMoney } from '../utils/handleMoney';
import { formatDate } from '../utils/handleDate';

import { DashboardData } from './types';

export default function Home() {
    const [data, setData] = useState<any>({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/home')
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                setLoading(false);
            });
    }, []);

    const budgetTypeMap = {
        WEEKLY: 'Week',
        BIWEEKLY: 'Fortnight',
        MONTHLY: 'Month',
    } as any;
    const targets = ['budget', 'actual'];

    return (
        <div className={styles.container}>
            <Head>
                <title>EzBudget | Home</title>
                <meta name="description" content="A budgeting app treating your paycycle as a first-class citizen." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <h1>EzBudget</h1>
                <ul>
                    <li>Settings</li>
                    <li>Sign Out</li>
                </ul>
            </header>

            <nav>
                <h2>{data.budgetDetails && budgetTypeMap[data.budgetDetails.paycycle_type]}</h2>
                <div>
                    <button>👈</button>
                    <span>
                        {data.start_date && formatDate(data.start_date)} - {data.start_date && formatDate(data.end_date)}
                    </span>
                    <button>👉</button>
                </div>
            </nav>

            <main className={styles.main}>
                {data &&
                    targets.map((target) => (
                        <div key={target}>
                            <h2>{target}</h2>
                            <div className={`${styles['card-container']} ${styles['connect']}`}>
                                <div className={`${styles.card} bg-green`}>
                                    <div>
                                        <span>Income</span>
                                        <h3>{data[target] && formatMoney(data[target].income.balance)}</h3>
                                    </div>
                                    <div className={styles.metadata}>
                                        <div>
                                            <span>Previous</span>
                                            <span>{data[target] && formatMoney(data[target].income.meta.previous_balance)}</span>
                                        </div>
                                        <div>
                                            <span>Future</span>
                                            <span>{data[target] && formatMoney(data[target].income.meta.future_balance)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.card} bg-red`}>
                                    <div>
                                        <span>Expenses</span>
                                        <h3>{data[target] && formatMoney(data[target].expenses.balance)}</h3>
                                    </div>
                                    <div className={styles.metadata}>
                                        <div>
                                            <span>Previous</span>
                                            <span>{data[target] && formatMoney(data[target].expenses.meta.previous_balance)}</span>
                                        </div>
                                        <div>
                                            <span>Future</span>
                                            <span>{data[target] && formatMoney(data[target].expenses.meta.future_balance)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.card} bg-purple`}>
                                    <div>
                                        <span>Balance</span>
                                        <h3>{data[target] && formatMoney(data[target].balance.balance)}</h3>
                                    </div>
                                    <div className={styles.metadata}>
                                        <div>
                                            <span>Previous</span>
                                            <span>{data[target] && formatMoney(data[target].balance.meta.previous_balance)}</span>
                                        </div>
                                        <div>
                                            <span>Future</span>
                                            <span>{data[target] && formatMoney(data[target].balance.meta.future_balance)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                <div className={styles['group-seperator']}>
                    <h2>Accounts</h2>
                    <div className={styles['card-container']}>
                        {data &&
                            data.accounts &&
                            data.accounts.map((account: any) => (
                                <div key={`${account.id}-${account.identifier}`} className={`${styles.card} ${account.isLiability ? 'bg-red' : 'bg-green'}`}>
                                    <div>
                                        <span>{account.identifier}</span>
                                        <h3>{formatMoney(account.balance)}</h3>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <a href="https://talke.dev/projects/ezbudget" target="_blank" rel="noopener noreferrer">
                    ezbudget © 2022 // made with ❤️ by talke.dev
                </a>
            </footer>
        </div>
    );
}
