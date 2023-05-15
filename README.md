# Lambda con Typescript usando AWS CDK

_Infrastructure as code framework used_: AWS CDK
_AWS Services used_: AWS Lambda, AWS DynamoDB

## Mantener actualizado el proyecto

Para mantener actualizado el proyecto, ejecutar:

```bash
npm install -g aws-cdk
```

## Requisitos

- AWS CLI already configured with Administrator permission
- AWS CDK - v2
- NodeJS 14.x installed
- CDK bootstrapped in your account

## Despliega esta demo

Despliega el proyecto en la nube:

```
cdk synth
cdk deploy
```

Cuando se te pregunte acerca de funciones que pueden no tener autorización definida, responde (y)es. El acceso a esas funciones estará abierto para cualquiera, así que mantén la aplicación desplegada sólo por el tiempo que necesites esta demostración en funcionamiento.

Para eliminar la aplicación:

```
cdk destroy
```

### AWS CDK useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
