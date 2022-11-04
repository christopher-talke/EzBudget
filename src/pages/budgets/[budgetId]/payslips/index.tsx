import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Playslips() {
    const router = useRouter();
    const { budgetId } = router.query;

    return (
        <div>
            <Head>
                <title>EzBudget | Paylips</title>
                <meta name="description" content="A budgeting app treating your paycycle as a first-class citizen." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>{budgetId} / Payslips</h1>
        </div>
    );
}
