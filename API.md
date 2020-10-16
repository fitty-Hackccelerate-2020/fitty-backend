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
  "internalError": false / true,
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
  "weight": 50, // in kg - optional
  "height": 127, // in cm - optional
  "age": 22, // optional
  "gender": "M" // must be 'M' or 'F' - optional
}
```

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
  "internalError": false / true,
  "data": "Reason"
}
```
