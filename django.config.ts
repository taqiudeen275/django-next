import type { DjangoNextConfig } from '@django-next/cli';
const config: DjangoNextConfig = {
  schema: "http://127.0.0.1:8000/api/schema/swagger-ui/",
  output: "./.django-next",
};
export default config;
