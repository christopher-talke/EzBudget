import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Budget() {
    const router = useRouter();
    const { budgetId } = router.query;

    return (
        <div>
            <Head>
                <title>EzBudget | Home</title>
                <meta name="description" content="A budgeting app treating your paycycle as a first-class citizen." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Budgets</h1>
        </div>
    );
}
