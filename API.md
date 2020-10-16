## Authentication

**endpoint**: `/auth/login`

**method**: `POST`

**body**:

```json
{
  "email": "",
  "password": ""
}
```

**success response**

```json
{
  "error": false,
  "data": "token"
}
```

**error response**

```json
{
  "error": true,
  "internalError": "boolean",
  "data": "Reason"
}
```

<hr/>

**endpoint**: `/auth/register`

**method**: `POST`

**body**:

```json
{
  "email": "",
  "password": "",
  "full_name": ""
}
```

**success response**

```json
{
  "error": false,
  "data": "token"
}
```

**error response**

```json
{
  "error": true,
  "internalError": "boolean",
  "data": "Reason"
}
```

## Users

**endpoint**: `/u/update`

**method**: `POST`

**body**:

```json
{
  "full_name": "string(optional)",
  "weight": 50,
  "height": 1.5,
  "age": 22,
  "gender": "M(must be 'M' or 'F')"
}
```

> Note: all parameters are optional, provide only which you want to update

**success response**

If all parameters(mentioned above) are passed

```json
{
  "error": false,
  "data": {
    "bmi": "number",
    "weightRange": ["number", "number"]
  }
}
```

If any one parameter is optional (except full_name)

```json
{
  "error": false,
  "data": "Success"
}
```

**error response**

```json
{
  "error": true,
  "internalError": "boolean",
  "data": "Reason"
}
```
