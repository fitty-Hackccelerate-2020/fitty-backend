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

**endpoint**: `api/u/update`

**method**: `POST`

**body**:

```json
{
  "full_name": "string(optional)",
  "weight": 50,
  "height": 1.5,
  "age": 22,
  "gender": "M(must be 'M' or 'F')",
  "token": ""
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

## Tasks

**endpoint**: `/api/t/initiate`

**method**: `POST`

**body**:

```json
{
  "goalWeight": "",
  "perWeekWeightGoal": "",
  "token": ""
}
```

**success response**

```json
{
  "error": false,
  "data": {
    "caloriesToConsume": "num",
    "drankWater": "num",
    "caloriesConsumed": "num",
    "diet": [
      {
        "foodName": "string",
        "quantity": "num",
        "caloriesGot": "num"
      }
    ],
    "sleep": {
      "sleptAt": "Date",
      "wokeupAt": "Date"
    },
    "workout": [
      {
        "workoutName": "string",
        "caloriesBurnt": "num"
      }
    ]
  }
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

<hr />

**endpoint**: `/api/t/today`

**method**: `POST`

**body**:

```json
{
  "token": ""
}
```

**success response**

```json
{
  "error": false,
  "data": {
    "caloriesToConsume": "num",
    "drankWater": "num",
    "caloriesConsumed": "num",
    "diet": [
      {
        "foodName": "string",
        "quantity": "num",
        "caloriesGot": "num"
      }
    ],
    "sleep": {
      "sleptAt": "Date",
      "wokeupAt": "Date"
    },
    "workout": [
      {
        "workoutName": "string",
        "caloriesBurnt": "num"
      }
    ]
  }
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
