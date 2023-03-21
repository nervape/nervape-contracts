export function getDeployment(network: string, name?: string) {
  const deployment = require(`./deployments/${network}`);
  return name ? deployment[name] : deployment;
}
