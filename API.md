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
  "internalError": false / true,
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
  "height": 127,
  "age": 22,
  "gender": "M(must be 'M' or 'F')"
}
```

> Note: all parameters are optional, provide only which you want to update

**success response**

```json
{
  "error": false,
  "data": "string"
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
