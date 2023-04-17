/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation UpsertBucket(\n    $id: String\n    $name: String\n    $project: String\n    $entity: String\n    $groupName: String\n    $description: String\n    $displayName: String\n    $notes: String\n    $commit: String\n    $config: JSONString\n    $host: String\n    $debug: Boolean\n    $program: String\n    $repo: String\n    $jobType: String\n    $state: String\n    $sweep: String\n    $tags: [String!]\n    $summaryMetrics: JSONString\n  ) {\n    upsertBucket(\n      input: {\n        id: $id\n        name: $name\n        groupName: $groupName\n        modelName: $project\n        entityName: $entity\n        description: $description\n        displayName: $displayName\n        notes: $notes\n        config: $config\n        commit: $commit\n        host: $host\n        debug: $debug\n        jobProgram: $program\n        jobRepo: $repo\n        jobType: $jobType\n        state: $state\n        sweep: $sweep\n        tags: $tags\n        summaryMetrics: $summaryMetrics\n      }\n    ) {\n      bucket {\n        id\n        name\n        displayName\n        description\n        config\n        sweepName\n        project {\n          id\n          name\n          entity {\n            id\n            name\n          }\n        }\n      }\n      inserted\n    }\n  }\n':
    types.UpsertBucketDocument,
  '\n  query Viewer {\n    viewer {\n      id\n      entity\n      flags\n      teams {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n':
    types.ViewerDocument,
  '\n  query RunUploadUrls(\n    $name: String!\n    $files: [String]!\n    $entity: String\n    $run: String!\n    $description: String\n  ) {\n    model(name: $name, entityName: $entity) {\n      bucket(name: $run, desc: $description) {\n        id\n        files(names: $files) {\n          uploadHeaders\n          edges {\n            node {\n              name\n              url(upload: true)\n              updatedAt\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.RunUploadUrlsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpsertBucket(\n    $id: String\n    $name: String\n    $project: String\n    $entity: String\n    $groupName: String\n    $description: String\n    $displayName: String\n    $notes: String\n    $commit: String\n    $config: JSONString\n    $host: String\n    $debug: Boolean\n    $program: String\n    $repo: String\n    $jobType: String\n    $state: String\n    $sweep: String\n    $tags: [String!]\n    $summaryMetrics: JSONString\n  ) {\n    upsertBucket(\n      input: {\n        id: $id\n        name: $name\n        groupName: $groupName\n        modelName: $project\n        entityName: $entity\n        description: $description\n        displayName: $displayName\n        notes: $notes\n        config: $config\n        commit: $commit\n        host: $host\n        debug: $debug\n        jobProgram: $program\n        jobRepo: $repo\n        jobType: $jobType\n        state: $state\n        sweep: $sweep\n        tags: $tags\n        summaryMetrics: $summaryMetrics\n      }\n    ) {\n      bucket {\n        id\n        name\n        displayName\n        description\n        config\n        sweepName\n        project {\n          id\n          name\n          entity {\n            id\n            name\n          }\n        }\n      }\n      inserted\n    }\n  }\n'
): typeof import('./graphql').UpsertBucketDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Viewer {\n    viewer {\n      id\n      entity\n      flags\n      teams {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ViewerDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query RunUploadUrls(\n    $name: String!\n    $files: [String]!\n    $entity: String\n    $run: String!\n    $description: String\n  ) {\n    model(name: $name, entityName: $entity) {\n      bucket(name: $run, desc: $description) {\n        id\n        files(names: $files) {\n          uploadHeaders\n          edges {\n            node {\n              name\n              url(upload: true)\n              updatedAt\n            }\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').RunUploadUrlsDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
