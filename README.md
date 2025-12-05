# SpatialFlow Node.js SDK

The official Node.js/TypeScript SDK for [SpatialFlow](https://spatialflow.io) - a real-time geospatial automation platform.

## Installation

```bash
npm install @spatialflow/sdk
# or
yarn add @spatialflow/sdk
# or
pnpm add @spatialflow/sdk
```

## Quick Start

```typescript
import { SpatialFlow } from "@spatialflow/sdk";

// Initialize with API key
const client = new SpatialFlow({ apiKey: "sf_xxx" });

// List geofences
const response = await client.geofences.appsGeofencesApiListGeofences();
for (const geofence of response.data.results) {
  console.log(`${geofence.name}: ${geofence.id}`);
}

// Create a geofence
const geofence = await client.geofences.appsGeofencesApiCreateGeofence({
  createGeofenceRequest: {
    name: "My Region",
    geometry: {
      type: "Polygon",
      coordinates: [[[-122.4, 37.8], [-122.4, 37.7], [-122.3, 37.7], [-122.3, 37.8], [-122.4, 37.8]]]
    }
  }
});
```

## Authentication

### API Key (Recommended for server-side)

```typescript
const client = new SpatialFlow({ apiKey: "sf_xxx" });
```

### JWT Token (For client-side apps)

```typescript
const client = new SpatialFlow({ accessToken: "eyJ..." });
```

## Resources

- **Geofences** - Create and manage geofences
- **Workflows** - Automate location-based actions
- **Webhooks** - Receive real-time event notifications
- **Devices** - Track device locations

## Method Naming

API methods are auto-generated from the OpenAPI spec and follow the pattern:
`apps{Resource}Api{Operation}`. For example:

```typescript
// Geofences
client.geofences.appsGeofencesApiListGeofences()
client.geofences.appsGeofencesApiCreateGeofence({ createGeofenceRequest: {...} })
client.geofences.appsGeofencesApiGetGeofence({ id: "..." })
client.geofences.appsGeofencesApiUpdateGeofence({ id: "...", ... })
client.geofences.appsGeofencesApiDeleteGeofence({ id: "..." })

// Workflows
client.workflows.appsWorkflowsApiListWorkflows()
client.workflows.appsWorkflowsApiCreateWorkflow({ ... })

// Webhooks
client.webhooks.appsWebhooksApiListWebhooks()
client.webhooks.appsWebhooksApiCreateWebhook({ ... })
```

Use your IDE's autocomplete to discover available methods, or see the
[API Reference](https://docs.spatialflow.io/sdk/node) for the full list.

## Webhook Verification

```typescript
import { verifyWebhookSignature, WebhookSignatureError } from "@spatialflow/sdk";

// In your Express webhook handler
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const event = verifyWebhookSignature({
      payload: req.body,
      signature: req.headers["x-sf-signature"] as string,
      secret: process.env.WEBHOOK_SECRET!,
    });

    // Process verified event
    console.log(event.type, event.data);
    res.sendStatus(200);
  } catch (e) {
    if (e instanceof WebhookSignatureError) {
      res.status(400).json({ error: e.message });
    } else {
      throw e;
    }
  }
});
```

## Pagination

Use the async iterator to paginate through all results:

```typescript
import { paginate } from "@spatialflow/sdk";

// Iterate through all geofences
for await (const geofence of paginate({
  fetchPage: (offset, limit) =>
    client.geofences.appsGeofencesApiListGeofences({ offset, limit }),
})) {
  console.log(geofence.name);
}

// Or collect all into an array
import { collectAll } from "@spatialflow/sdk";

const allGeofences = await collectAll({
  fetchPage: (offset, limit) =>
    client.geofences.appsGeofencesApiListGeofences({ offset, limit }),
});
```

## File Uploads

Upload geofence files (GeoJSON, KML, GPX) with automatic job polling:

```typescript
import { uploadGeofences } from "@spatialflow/sdk";

const result = await uploadGeofences({
  client,
  filePath: "boundaries.geojson",
  groupName: "my-region",
  timeout: 120000,
  onStatus: (status) => console.log(`Status: ${status}`),
});

console.log(`Created ${result.createdCount} geofences`);
for (const geofence of result.createdGeofences) {
  console.log(`  - ${geofence.name} (${geofence.id})`);
}
```

## Async Job Polling

For lower-level control over job polling:

```typescript
import { pollJob, JobTimeoutError, JobFailedError } from "@spatialflow/sdk";

try {
  const result = await pollJob({
    fetchStatus: () =>
      client.geofences.appsGeofencesApiGetUploadJobStatus({ jobId }),
    timeout: 120000,
    pollInterval: 2000,
    onStatus: (status) => console.log(`Status: ${status}`),
  });

  console.log(`Job completed: ${result.createdCount} created`);
} catch (e) {
  if (e instanceof JobTimeoutError) {
    console.log(`Job timed out (last status: ${e.lastStatus})`);
  } else if (e instanceof JobFailedError) {
    console.log(`Job failed: ${e.errorMessage}`);
  }
}
```

## Documentation

- [API Reference](https://docs.spatialflow.io/sdk/node)
- [Examples](./examples/)
- [Changelog](./CHANGELOG.md)

## Support

- GitHub Issues: https://github.com/spatialflow-io/spatialflow-node/issues
- Email: support@spatialflow.io

## License

MIT License - see [LICENSE](./LICENSE) for details.
