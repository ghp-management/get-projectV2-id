import * as core from '@actions/core'
import { ProjectV2IdClient } from './client.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token', { required: true })
    const owner: string = core.getInput('owner', { required: true })
    const owner_typology: string = core.getInput('owner_typology', {
      required: true
    })

    const p_number: number = Number(
      core.getInput('project_number', { required: true })
    )

    const client = new ProjectV2IdClient(token, owner, owner_typology, p_number)
    const project_id: string = await client.queryProjectV2Id()

    if (!project_id) {
      core.setFailed(
        `Project number ${p_number} not found for ${owner_typology} ${owner}`
      )

      return
    }

    core.debug(`Project ID Found: ${project_id}`)
    core.setOutput('project_id', project_id)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
