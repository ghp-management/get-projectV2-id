import * as github from '@actions/github'
import { ProjectV2IdResponse } from './response.js'

enum OwnerTypologies {
  Organization = 'organization',
  User = 'user'
}

export class ProjectV2IdClient {
  constructor(
    private token: string,
    private owner: string,
    private owner_typology: string,
    private project_number: number
  ) {
    if (
      !Object.values(OwnerTypologies).includes(
        owner_typology as OwnerTypologies
      )
    ) {
      throw new Error('Input `owner_typology` has an invalid value')
    }
  }

  async queryProjectV2Id(): Promise<string> {
    const octokit = github.getOctokit(this.token)
    const query = `query ($owner: String!, $number: Int!) {
                      target:${this.owner_typology}(login: $owner) {
                        projectV2(number: $number) {
                          id
                        }
                      }
                    }`

    const res = await octokit.graphql<ProjectV2IdResponse>(query, {
      owner: this.owner,
      number: this.project_number
    })

    return res.target.projectV2?.id
  }
}
