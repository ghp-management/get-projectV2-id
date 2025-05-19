<p align="center">
    <img src="https://avatars.githubusercontent.com/u/212018926?s=200">
</p>

# get-projectV2-id

This action actually outputs the ProjectV2 long format ID starting from the
organization/ user login name and project number.

## Usage

### Inputs

| name           | value  | default | required | description                                   |
| -------------- | ------ | ------- | -------- | --------------------------------------------- |
| token          | string | ''      | t        | Github valid Token for Project                |
| owner          | string | ''      | t        | Owner login name                              |
| owner_typology | string | ''      | t        | Can be one of ['organization', 'user' ]       |
| project_number | number |         | t        | ProjectV2 Number (took from Project URL path) |

### Outputs

**project_id**: The ProjectV2 ID in long format, usually starts with `PVT_`

## Example usage

workflow.yaml

```yaml
jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - name: Get ProjectV2 ID
        id: get-projectV2-id
        uses: ghp-management/get-projectV2-id@main
        with:
          token: ${{ secrets.GH_PAT_TOKEN }}
          owner: ${{ inputs.organization }}
          owner_typology: 'organization'
          project_number: ${{ inputs.project_number }}
```
