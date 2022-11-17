// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PaycycleType } from '.prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'

type Data = {
  message: string
}

type NewBudgetData = {
  identifier: string
  paycycle_type: PaycycleType
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  switch(req.method) {
    case 'POST':
      const response = await handleBudgetSubmission(req.body)
      if (response) return res.redirect('/')

      return res.status(500).json({
        message: 'There was an issue with creating that budget'
      })
    
    default:
      return res.status(404);
  }

}


/**
 * Creates a new budget when a form submission is sent
 * @param newBudgetData 
 * @returns 
 */
async function handleBudgetSubmission(newBudgetData : NewBudgetData) {

  try {
    const createdBudget = await prisma.budget.create({
      data : {
        identifier : newBudgetData.identifier,
        paycycle_type: newBudgetData.paycycle_type
      }
    })    

    return createdBudget;
  } 
  
  catch (error) {
    throw new Error(`There was an issue saving the new budget to the database.`)
  }

}