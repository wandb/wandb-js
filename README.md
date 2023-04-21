<p align="center">
  <img src=".github/logo-dark.svg#gh-dark-mode-only" width="600" alt="Weights & Biases" />
  <img src=".github/logo-light.svg#gh-light-mode-only" width="600" alt="Weights & Biases" />
</p>


Use W&B to build better models faster. Track and visualize all the pieces of your machine learning pipeline, from datasets to production machine learning models. Get started with W&B today, [sign up for a free account!](https://wandb.com?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme)


🎓 W&B is free for students, educators, and academic researchers. For more information, visit [https://wandb.ai/site/research](https://wandb.ai/site/research?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme).

Want to use Weights & Biases for seamless collaboration between your ML or Data Science team? Looking for Production-grade MLOps at scale? Sign up to one of [our plans](https://wandb.ai/site/pricing) or [contact the Sales Team](https://wandb.ai/site/contact).

&nbsp;

# Documentation

<p align='center'>
<a target="_blank" href="https://docs.wandb.ai/guides/track?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/README/Product_Icons_dark_background/experiments-dark.svg" width="12.0%">
  <source media="(prefers-color-scheme: light)" srcset=".github/README/Product_Icons_light/experiments-light.svg" width="12.0%">
  <img alt="Weights and Biases Experiments" src="">
</picture>
</a>
<a target="_blank" href="https://docs.wandb.ai/guides/reports?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/README/Product_Icons_dark_background/report-dark.svg" width="12.0%">
  <source media="(prefers-color-scheme: light)" srcset=".github/README/Product_Icons_light/report-light.svg" width="12.0%">
  <img alt="Weights and Biases Reports" src="">
</picture>
</a>
<a target="_blank" href="https://docs.wandb.ai/guides/artifacts?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/README/Product_Icons_dark_background/artifacts-dark.svg" width="12.0%">
  <source media="(prefers-color-scheme: light)" srcset=".github/README/Product_Icons_light/artifacts-light.svg" width="12.0%">
  <img alt="Weights and Biases Artifacts" src="">
</picture>
</a>
<a target="_blank" href="https://docs.wandb.ai/guides/data-vis?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/README/Product_Icons_dark_background/tables-dark.svg" width="12.0%">
  <source media="(prefers-color-scheme: light)" srcset=".github/README/Product_Icons_light/tables-light.svg" width="12.0%">
  <img alt="Weights and Biases Tables" src="">
</picture>
</a>
<a target="_blank" href="https://docs.wandb.ai/guides/sweeps?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/README/Product_Icons_dark_background/sweeps-dark.svg" width="12.0%">
  <source media="(prefers-color-scheme: light)" srcset=".github/README/Product_Icons_light/sweeps-light.svg" width="12.0%">
  <img alt="Weights and Biases Sweeps" src="">
</picture>
</a>
<a target="_blank" href="https://docs.wandb.ai/guides/models?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/README/Product_Icons_dark_background/models-dark.svg" width="12.0%">
  <source media="(prefers-color-scheme: light)" srcset=".github/README/Product_Icons_light/models-light.svg" width="12.0%">
  <img alt="Weights and Biases Model Management" src="">
</picture>
</a>
<a target="_blank" href="https://docs.wandb.ai/guides/launch?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/README/Product_Icons_dark_background/launch-dark.svg" width="12.0%">
  <source media="(prefers-color-scheme: light)" srcset=".github/README/Product_Icons_light/launch-light.svg" width="12.0%">
  <img alt="Weights and Biases Launch" src="">
</picture>
</a>
<a target="_blank" href="https://docs.wandb.ai/guides/prompts?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/README/Product_Icons_dark_background/prompts-dark.svg" width="12.0%">
  <source media="(prefers-color-scheme: light)" srcset=".github/README/Product_Icons_light/prompts-light.svg" width="12.0%">
  <img alt="Weights and Biases Prompts" src="">
</picture>
</p>


This is a TypeScript library compatible with Node and modern Web Browsers.  It's inspired by our official [Python SDK](https://docs.wandb.ai/?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=documentation).  We're currently missing a lot of the functionality found in our Python SDK, basic logging functionality is available:

```typescript
import wandb from '@wandb/sdk'

await wandb.init({config: {test: 1}});
wandb.log({acc: 0.9, loss: 0.1});
wandb.log({acc: 0.91, loss: 0.09});
await wandb.finish();
```

We'll be adding additional features like [Tables](https://docs.wandb.ai/guides/data-vis?utm_source=github&utm_medium=code&utm_campaign=wandb&utm_content=readme) soon.

## Integrations

### Langchain

Traces can be logged from [langchain](https://github.com/hwchase17/langchainjs).

```typescript
import {WandbTracer} from '@wandb/sdk/integrations/langchain';

await WandbTracer.init({project: 'langchain-test'});
// run your langchain workloads...
await WandbTracer.finish();
```