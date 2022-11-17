import './page.css'
import prisma from '../prisma/client'

import HomeHoc from '../components/Logic/HomeHoc/HomeHoc'


async function getData() {
  try {
    
    const budgets = await prisma.budget.findMany();
    
    if (budgets === null || budgets.length === 0) {
      return [];
    }

    return budgets;
  } catch (error) {
    throw new Error(JSON.stringify({
      message: 'Failed to get budgets from database',
      error
    }));
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="home_page">
      <HomeHoc budgets={data} />
    </main>
  )
}
