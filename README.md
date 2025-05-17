<p align="center">
    <img src="https://avatars.githubusercontent.com/u/212018926?s=200">
</p>

# get-projectV2-id

This action actually outputs the ProjectV2 long format ID starting from the organization/ user login name and project number.

## Usage

In order to use this action you need to provide a valid token with Project r/w permissions.

### Inputs

| name           | value  | default | required | description                                   |
|----------------|--------|---------|----------|-----------------------------------------------|
| token          | string | ''      | t        | Github valid Token for Project                |
| organization   | string | ''      |          | Organization login name                       |
| user           | string | ''      |          | User login name                               |
| project_number | number |         | t        | ProjectV2 Number (took from Project URL path) |

At least `organization` or `user` login name is required.

### Outputs

**project_id**: The ProjectV2 ID in long format, usually starts with `PVT_`

## Example usage

workflow.yaml
``` yaml

jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - name: Get ProjectV2 ID
        id: get-projectV2-id
        uses: ghp-management/get-projectV2-id@main
        with:
          token: ${{ secrets.GH_PAT_TOKEN }}
          organization: ${{ inputs.organization }}
          project_number: ${{ inputs.project_number }}

```
