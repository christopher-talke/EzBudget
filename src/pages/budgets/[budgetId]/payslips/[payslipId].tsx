import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Payslip() {
    const router = useRouter();
    const { budgetId, payslipId } = router.query;

    return (
        <div>
            <Head>
                <title>EzBudget | Home</title>
                <meta name="description" content="A budgeting app treating your paycycle as a first-class citizen." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>
                {budgetId} / {payslipId}
            </h1>
        </div>
    );
}
