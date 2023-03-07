import { ID } from 'type-graphql'

import { IndustryCategory } from 'Constants/intrustryCategory'
import { JobPosition } from 'Constants/jobPosition'

import { CV } from 'Models'

import { Transaction } from 'Services/Db'

export default async function createCVByEmail({
  objective,
  cvUrl,
  jobPosition,
  industryCategory,
  createdBy,
  numberOfYearsExperience,
  minExpectedSalary,
  maxExpectedSalary,
  skills,
  tags,
  transaction: tx,
}: {
  objective?: string
  cvUrl?: string
  jobPosition?: string
  industryCategory?: string
  createdBy?: string
  numberOfYearsExperience?: number
  minExpectedSalary?: number
  maxExpectedSalary?: number
  skills?: string
  tags?: string
  transaction?: Transaction
}) {

  
  const createdCV = await CV.create({
    objective,
    cvUrl,
    jobPosition,
    industryCategory,
    createdBy,
    numberOfYearsExperience,
    minExpectedSalary,
    maxExpectedSalary,
    skills,
    tags,
  })

  return createdCV
}
