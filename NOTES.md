# Notes

## Theme?

- [Space Ahead](https://astro.build/themes/details/space-ahead/)
- [Color frames](https://mycolor.space/?hex=%23E2DB46&sub=1)

## GDPR

- [Generator](https://app.dg-datenschutz.de/)

## Metrics

You could run **Umami** or **Plausible** on Azure using your free credits. Here are your options:

**Best option for Azure:**
1. **Azure Container Instances (ACI)** - Run Umami in a Docker container with PostgreSQL
2. **Azure App Service** - Deploy Umami with a managed PostgreSQL database
3. **Azure Container Apps** - More cost-effective for low traffic, scales to zero

**Umami is particularly good for Azure because:**
- Small resource footprint (runs on minimal specs)
- Official Docker image available
- Works with PostgreSQL (Azure Database for PostgreSQL)
- Can use Azure's free tier resources

**Quick setup would be:**
- Azure Database for PostgreSQL (Flexible Server - has free tier)
- Azure Container Instances or Container Apps to run Umami
- Connect them via environment variables

The total cost would be minimal or potentially free within your Azure credits, and you'd just add a small script tag to your `BaseLayout.astro`.
