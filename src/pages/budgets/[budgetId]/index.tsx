import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../../styles/Home.module.css';

import { formatMoney } from '../../../utils/handleMoney';
import { formatDate } from '../../../utils/handleDate';

import { DashboardData } from '../../types';

export default function Home() {
    const router = useRouter();

    console.log(router);

    const { budgetId } = router.query;
    const [data, setData] = useState<any>({});

    useEffect(() => {
        fetch(`/api/home?budgetId=${budgetId}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
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
                    <button>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.5852 7.4795L10.1685 12.7295C10.256 12.7901 10.3585 12.8255 10.4647 12.832C10.5709 12.8386 10.6769 12.8159 10.7712 12.7665C10.8654 12.7171 10.9444 12.6429 10.9995 12.5519C11.0546 12.4608 11.0837 12.3564 11.0838 12.25V1.75C11.0839 1.64353 11.0548 1.53907 10.9997 1.44794C10.9447 1.35681 10.8657 1.28249 10.7714 1.23304C10.6771 1.18358 10.5711 1.16087 10.4648 1.16737C10.3586 1.17387 10.2561 1.20934 10.1685 1.26992L2.5852 6.51992C2.50794 6.57384 2.44485 6.64561 2.40128 6.72915C2.35771 6.81268 2.33496 6.9055 2.33496 6.99971C2.33496 7.09392 2.35771 7.18674 2.40128 7.27027C2.44485 7.35381 2.50794 7.42558 2.5852 7.4795Z"
                                fill="#151515"
                            />
                        </svg>
                    </button>
                    <span>
                        {data.start_date && formatDate(data.start_date)} - {data.start_date && formatDate(data.end_date)}
                    </span>
                    <button>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.22966 12.7668C3.32402 12.8159 3.42997 12.8384 3.53613 12.8318C3.64229 12.8252 3.74466 12.7899 3.83224 12.7295L11.4156 7.4795C11.4931 7.42581 11.5564 7.35415 11.6001 7.27064C11.6439 7.18713 11.6667 7.09427 11.6667 7C11.6667 6.90573 11.6439 6.81287 11.6001 6.72936C11.5564 6.64585 11.4931 6.57418 11.4156 6.5205L3.83224 1.2705C3.74473 1.20994 3.64231 1.17449 3.53609 1.16796C3.42987 1.16144 3.32389 1.18409 3.22962 1.23348C3.13535 1.28287 3.05639 1.3571 3.00128 1.44815C2.94618 1.53919 2.91703 1.64358 2.91699 1.75V12.25C2.91697 12.3565 2.9461 12.4609 3.00122 12.552C3.05633 12.6431 3.13534 12.7174 3.22966 12.7668Z"
                                fill="#151515"
                            />
                        </svg>
                    </button>
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
