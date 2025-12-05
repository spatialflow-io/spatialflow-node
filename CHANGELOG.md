# Changelog

All notable changes to the SpatialFlow Node.js SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-04

### Added

- Initial alpha release
- **Authentication**: API key and JWT token support
- **Client**: `SpatialFlow` client class with resource accessors
- **Resources**: Full CRUD for geofences, workflows, webhooks, devices
- **Pagination**: `paginate()` async generator and `collectAll()` utility
- **Webhook verification**: `verifyWebhookSignature()` with HMAC-SHA256
- **Job polling**: `pollJob()` for async job status tracking
- **File uploads**: `uploadGeofences()` for GeoJSON/KML/GPX imports
- **Typed errors**: `AuthenticationError`, `NotFoundError`, `ValidationError`, etc.
- **TypeScript**: Full type definitions for all APIs and models

### Technical Details

- Generated from OpenAPI spec using openapi-generator-cli 7.10.0
- TypeScript generator with axios HTTP client
- Requires Node.js 18+ (for global fetch in upload helpers)
- Dual ESM/CJS build with tsup
- Dependencies: axios
