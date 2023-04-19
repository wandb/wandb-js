/* eslint-disable */
import {DocumentTypeDecoration} from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Duration: any;
  Int64: any;
  JSON: any;
  JSONString: any;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  emails: Array<Scalars['String']>;
  id: Scalars['ID'];
  lastAccessedAt?: Maybe<Scalars['DateTime']>;
  projects: Array<Project>;
  revokedAt?: Maybe<Scalars['DateTime']>;
  token: Scalars['String'];
  type: AccessTokenType;
  view: View;
};

export enum AccessTokenType {
  IndividualSharing = 'INDIVIDUAL_SHARING',
  Public = 'PUBLIC',
  Restricted = 'RESTRICTED',
}

export type AckRunQueueItemInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  runName: Scalars['String'];
  runQueueItemId: Scalars['ID'];
};

export type AckRunQueueItemPayload = {
  __typename?: 'AckRunQueueItemPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ActiveExperiment = Node & {
  __typename?: 'ActiveExperiment';
  activeVariants: Array<ActiveVariant>;
  endAt?: Maybe<Scalars['DateTime']>;
  experimentType: ExperimentType;
  id: Scalars['ID'];
  name: Scalars['String'];
  startAt?: Maybe<Scalars['DateTime']>;
};

export type ActiveVariant = {
  __typename?: 'ActiveVariant';
  allocation: Scalars['Int'];
  bucket: Scalars['Int'];
};

export type AddAliasesInput = {
  aliases: Array<ArtifactCollectionAliasInput>;
  artifactID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type AddAliasesPayload = {
  __typename?: 'AddAliasesPayload';
  aliases: Array<ArtifactCollectionAlias>;
  artifact: Artifact;
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type AddFilesInput = {
  bucketName?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  modelName: Scalars['String'];
  names: Array<InputMaybe<Scalars['String']>>;
};

export type AddFilesPayload = {
  __typename?: 'AddFilesPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  files?: Maybe<FileConnection>;
};

export type AddFilesPayloadFilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AddProtectedAliasesInput = {
  adminType: WorkflowsAdminType;
  aliases: Array<Scalars['String']>;
  clientMutationID?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
};

export type AddProtectedAliasesPayload = {
  __typename?: 'AddProtectedAliasesPayload';
  aliases: Array<Scalars['String']>;
  clientMutationID?: Maybe<Scalars['String']>;
};

export type AddUserToOrganizationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  teams?: InputMaybe<Array<Scalars['String']>>;
  userName: Scalars['String'];
  userOrgRole: Scalars['String'];
};

export type AddUserToOrganizationPayload = {
  __typename?: 'AddUserToOrganizationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type AddWorkflowsAdminInput = {
  adminType: WorkflowsAdminType;
  clientMutationID?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  username: Scalars['String'];
};

export type AddWorkflowsAdminPayload = {
  __typename?: 'AddWorkflowsAdminPayload';
  clientMutationID?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Agent = Node & {
  __typename?: 'Agent';
  createdAt: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  heartbeatAt?: Maybe<Scalars['DateTime']>;
  /** TODO: enum? */
  host: Scalars['String'];
  id: Scalars['ID'];
  metrics: Scalars['JSONString'];
  name: Scalars['String'];
  persistent?: Maybe<Scalars['Boolean']>;
  runs: RunConnection;
  state?: Maybe<Scalars['String']>;
  /** TODO: non-null? */
  sweep: Sweep;
  totalRuns: Scalars['Int'];
  user?: Maybe<User>;
};

export type AgentRunsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type AgentConnection = {
  __typename?: 'AgentConnection';
  edges: Array<AgentEdge>;
  pageInfo: PageInfo;
};

export type AgentEdge = {
  __typename?: 'AgentEdge';
  cursor: Scalars['String'];
  node: Agent;
};

export type AgentHeartbeatInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  metrics?: InputMaybe<Scalars['JSONString']>;
  runState?: InputMaybe<Scalars['JSONString']>;
};

export type AgentHeartbeatPayload = {
  __typename?: 'AgentHeartbeatPayload';
  agent?: Maybe<Agent>;
  clientMutationId?: Maybe<Scalars['String']>;
  commands?: Maybe<Scalars['JSONString']>;
};

export enum Aggregation {
  Average = 'AVERAGE',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
}

export type AggregationKey = {
  aggregation: Aggregation;
  key: Scalars['String'];
};

export type Alert = {
  __typename?: 'Alert';
  condition: AlertCondition;
  events: AlertEventConnection;
  id: Scalars['ID'];
  subscriptions: Array<AlertSubscription>;
};

export type AlertEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  from: Scalars['DateTime'];
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['DateTime']>;
};

export type AlertCondition =
  | FinishedRunCondition
  | ScriptableRunCondition
  | StoppedRunCondition;

export type AlertEvent = {
  __typename?: 'AlertEvent';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
};

export type AlertEventConnection = {
  __typename?: 'AlertEventConnection';
  edges: Array<AlertEventEdge>;
  pageInfo: PageInfo;
};

export type AlertEventEdge = {
  __typename?: 'AlertEventEdge';
  cursor: Scalars['String'];
  node?: Maybe<AlertEvent>;
};

export enum AlertSeverity {
  Error = 'ERROR',
  Info = 'INFO',
  Warn = 'WARN',
}

export type AlertSubscription = {
  id: Scalars['ID'];
};

export type ApiKey = {
  __typename?: 'ApiKey';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ips: Array<Scalars['String']>;
  name: Scalars['String'];
  rateLimit?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ApiKeyConnection = {
  __typename?: 'ApiKeyConnection';
  edges: Array<ApiKeyEdge>;
  pageInfo: PageInfo;
};

export type ApiKeyEdge = {
  __typename?: 'ApiKeyEdge';
  cursor: Scalars['String'];
  node?: Maybe<ApiKey>;
};

export type Artifact = {
  __typename?: 'Artifact';
  aliases: Array<ArtifactAlias>;
  /** @deprecated No longer supported */
  artifactActions?: Maybe<ArtifactActionConnection>;
  artifactCollections: ArtifactCollectionConnection;
  artifactLineageDag?: Maybe<ArtifactLineageDag>;
  artifactMemberships: ArtifactCollectionMembershipConnection;
  artifactSequence: ArtifactSequence;
  artifactType: ArtifactType;
  commitHash?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: Initiator;
  currentManifest?: Maybe<ArtifactManifest>;
  description?: Maybe<Scalars['String']>;
  digest: Scalars['String'];
  fileCount: Scalars['Int64'];
  files: FileConnection;
  historyStep?: Maybe<Scalars['Int64']>;
  id: Scalars['ID'];
  labels?: Maybe<Scalars['JSONString']>;
  metadata?: Maybe<Scalars['JSONString']>;
  size: Scalars['Int64'];
  state: ArtifactState;
  storageBytes: Scalars['Int64'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  usedBy: RunConnection;
  usedByApprox: RunConnection;
  usedCount: Scalars['Int'];
  versionIndex?: Maybe<Scalars['Int']>;
};

export type ArtifactAliasesArgs = {
  artifactCollectionName?: InputMaybe<Scalars['String']>;
};

export type ArtifactArtifactActionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactArtifactLineageDagArgs = {
  filterGeneratedArtifacts: Scalars['Boolean'];
  limit: Scalars['Int'];
};

export type ArtifactCommitHashArgs = {
  artifactCollectionName?: InputMaybe<Scalars['String']>;
};

export type ArtifactFilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  names?: InputMaybe<Array<Scalars['String']>>;
};

export type ArtifactUsedByArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactUsedByApproxArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ArtifactUsedByApproxOrdering>;
};

export type ArtifactVersionIndexArgs = {
  artifactCollectionName?: InputMaybe<Scalars['String']>;
};

export type ArtifactAction = {
  artifact: Artifact;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  initiator: Initiator;
};

export type ArtifactActionConnection = {
  __typename?: 'ArtifactActionConnection';
  edges: Array<ArtifactActionEdge>;
  pageInfo: PageInfo;
};

export type ArtifactActionEdge = {
  __typename?: 'ArtifactActionEdge';
  cursor: Scalars['String'];
  node: ArtifactAction;
};

export type ArtifactAlias = {
  __typename?: 'ArtifactAlias';
  alias: Scalars['String'];
  artifact?: Maybe<Artifact>;
  artifactCollection?: Maybe<ArtifactCollection>;
  artifactCollectionName: Scalars['String'];
  id: Scalars['ID'];
};

export type ArtifactAliasAction = {
  __typename?: 'ArtifactAliasAction';
  actionType: Scalars['String'];
  alias: Scalars['String'];
  artifactCollection: ArtifactCollection;
  createdAt: Scalars['DateTime'];
  sourceArtifact?: Maybe<Artifact>;
  targetArtifact?: Maybe<Artifact>;
  user?: Maybe<User>;
};

export type ArtifactAliasActionConnection = {
  __typename?: 'ArtifactAliasActionConnection';
  edges: Array<ArtifactAliasActionEdge>;
  pageInfo: PageInfo;
};

export type ArtifactAliasActionEdge = {
  __typename?: 'ArtifactAliasActionEdge';
  cursor: Scalars['String'];
  node: ArtifactAliasAction;
};

export type ArtifactAliasConnection = {
  __typename?: 'ArtifactAliasConnection';
  edges: Array<ArtifactAliasEdge>;
  pageInfo: PageInfo;
};

export type ArtifactAliasEdge = {
  __typename?: 'ArtifactAliasEdge';
  cursor: Scalars['String'];
  node?: Maybe<ArtifactAlias>;
};

export type ArtifactAliasInput = {
  alias: Scalars['String'];
  artifactCollectionName: Scalars['String'];
};

export type ArtifactCollection = {
  aliasActionHistory: ArtifactAliasActionConnection;
  aliases: ArtifactAliasConnection;
  /** @deprecated No longer supported */
  artifactActions?: Maybe<ArtifactActionConnection>;
  artifactCollectionActions: ArtifactCollectionActionConnection;
  artifactMembership?: Maybe<ArtifactCollectionMembership>;
  artifactMemberships: ArtifactCollectionMembershipConnection;
  artifacts?: Maybe<VersionedArtifactConnection>;
  createdAt: Scalars['DateTime'];
  defaultArtifactType: ArtifactType;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  project: Project;
  state: ArtifactCollectionState;
  tags: TagConnection;
  triggers: TriggerConnection;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ArtifactCollectionAliasActionHistoryArgs = {
  after?: InputMaybe<Scalars['String']>;
  alias?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactCollectionAliasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactCollectionArtifactActionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactCollectionArtifactCollectionActionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactCollectionArtifactMembershipArgs = {
  aliasName: Scalars['String'];
};

export type ArtifactCollectionArtifactMembershipsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactCollectionArtifactsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactCollectionTagsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  tagCategoryName?: InputMaybe<Scalars['String']>;
};

export type ArtifactCollectionTriggersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactCollectionAction = {
  __typename?: 'ArtifactCollectionAction';
  actionType: Scalars['String'];
  artifact?: Maybe<Artifact>;
  artifactCollection?: Maybe<ArtifactCollection>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user?: Maybe<User>;
};

export type ArtifactCollectionActionConnection = {
  __typename?: 'ArtifactCollectionActionConnection';
  edges: Array<ArtifactCollectionActionEdge>;
  pageInfo: PageInfo;
};

export type ArtifactCollectionActionEdge = {
  __typename?: 'ArtifactCollectionActionEdge';
  cursor: Scalars['String'];
  node: ArtifactCollectionAction;
};

export type ArtifactCollectionAlias = {
  __typename?: 'ArtifactCollectionAlias';
  alias: Scalars['String'];
  artifactCollectionName: Scalars['String'];
  entityName: Scalars['String'];
  projectName: Scalars['String'];
};

export type ArtifactCollectionAliasInput = {
  alias: Scalars['String'];
  artifactCollectionName: Scalars['String'];
  entityName: Scalars['String'];
  projectName: Scalars['String'];
};

export type ArtifactCollectionConnection = {
  __typename?: 'ArtifactCollectionConnection';
  edges: Array<ArtifactCollectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ArtifactCollectionEdge = {
  __typename?: 'ArtifactCollectionEdge';
  cursor: Scalars['String'];
  node?: Maybe<ArtifactCollection>;
};

export type ArtifactCollectionMembership = {
  __typename?: 'ArtifactCollectionMembership';
  aliases: Array<ArtifactAlias>;
  artifact?: Maybe<Artifact>;
  artifactCollection?: Maybe<ArtifactCollection>;
  commitHash?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  versionIndex?: Maybe<Scalars['Int']>;
};

export type ArtifactCollectionMembershipConnection = {
  __typename?: 'ArtifactCollectionMembershipConnection';
  edges: Array<ArtifactCollectionMembershipEdge>;
  pageInfo: PageInfo;
};

export type ArtifactCollectionMembershipEdge = {
  __typename?: 'ArtifactCollectionMembershipEdge';
  cursor: Scalars['String'];
  node?: Maybe<ArtifactCollectionMembership>;
};

export enum ArtifactCollectionState {
  Deleted = 'DELETED',
  Ready = 'READY',
}

export enum ArtifactCollectionType {
  Portfolio = 'PORTFOLIO',
  Sequence = 'SEQUENCE',
}

export type ArtifactConnection = ArtifactConnectionType & {
  __typename?: 'ArtifactConnection';
  edges: Array<ArtifactEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ArtifactConnectionType = {
  edges: Array<ArtifactEdgeType>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** deprecated */
export enum ArtifactDigestAlgorithm {
  ManifestMd5 = 'MANIFEST_MD5',
}

export type ArtifactEdge = ArtifactEdgeType & {
  __typename?: 'ArtifactEdge';
  cursor: Scalars['String'];
  node?: Maybe<Artifact>;
};

export type ArtifactEdgeType = {
  cursor: Scalars['String'];
  node?: Maybe<Artifact>;
};

export type ArtifactLineageDag = {
  __typename?: 'ArtifactLineageDag';
  artifacts: Array<Maybe<ArtifactLineageDagArtifact>>;
  edges: Array<Maybe<ArtifactLineageDagEdge>>;
  hitLimit: Scalars['Boolean'];
  runs: Array<Maybe<ArtifactLineageDagRun>>;
};

export type ArtifactLineageDagArtifact = {
  __typename?: 'ArtifactLineageDagArtifact';
  artifactCommitHash: Scalars['String'];
  artifactNodeID: Scalars['String'];
  artifactSequenceName: Scalars['String'];
  artifactTypeName: Scalars['String'];
  entityName: Scalars['String'];
  projectName: Scalars['String'];
  versionIndex: Scalars['Int'];
};

export type ArtifactLineageDagEdge = {
  __typename?: 'ArtifactLineageDagEdge';
  artifactNodeID: Scalars['String'];
  direction: DagDirection;
  edgeID: Scalars['String'];
  runNodeID: Scalars['String'];
};

export type ArtifactLineageDagRun = {
  __typename?: 'ArtifactLineageDagRun';
  displayName?: Maybe<Scalars['String']>;
  entityName: Scalars['String'];
  jobType?: Maybe<Scalars['String']>;
  projectName: Scalars['String'];
  runName: Scalars['String'];
  runNodeID: Scalars['String'];
};

export type ArtifactManifest = {
  __typename?: 'ArtifactManifest';
  artifact: Artifact;
  createdAt: Scalars['DateTime'];
  digest: Scalars['String'];
  file: File;
  id: Scalars['ID'];
  type: ArtifactManifestType;
};

export type ArtifactManifestConnection = {
  __typename?: 'ArtifactManifestConnection';
  edges: Array<ArtifactManifestEdge>;
  pageInfo: PageInfo;
};

export type ArtifactManifestEdge = {
  __typename?: 'ArtifactManifestEdge';
  cursor: Scalars['String'];
  node?: Maybe<ArtifactManifest>;
};

export enum ArtifactManifestType {
  Full = 'FULL',
  Incremental = 'INCREMENTAL',
  Patch = 'PATCH',
}

export type ArtifactPortfolio = ArtifactCollection & {
  __typename?: 'ArtifactPortfolio';
  aliasActionHistory: ArtifactAliasActionConnection;
  aliases: ArtifactAliasConnection;
  /** @deprecated No longer supported */
  artifactActions: ArtifactActionConnection;
  artifactCollectionActions: ArtifactCollectionActionConnection;
  artifactMembership?: Maybe<ArtifactCollectionMembership>;
  artifactMemberships: ArtifactCollectionMembershipConnection;
  artifacts: VersionedArtifactConnection;
  createdAt: Scalars['DateTime'];
  defaultArtifactType: ArtifactType;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  project: Project;
  state: ArtifactCollectionState;
  tags: TagConnection;
  triggers: TriggerConnection;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ArtifactPortfolioAliasActionHistoryArgs = {
  after?: InputMaybe<Scalars['String']>;
  alias?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactPortfolioAliasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactPortfolioArtifactActionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactPortfolioArtifactCollectionActionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactPortfolioArtifactMembershipArgs = {
  aliasName: Scalars['String'];
};

export type ArtifactPortfolioArtifactMembershipsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactPortfolioArtifactsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactPortfolioTagsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  tagCategoryName?: InputMaybe<Scalars['String']>;
};

export type ArtifactPortfolioTriggersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactSequence = ArtifactCollection & {
  __typename?: 'ArtifactSequence';
  aliasActionHistory: ArtifactAliasActionConnection;
  aliases: ArtifactAliasConnection;
  /** @deprecated No longer supported */
  artifactActions: ArtifactActionConnection;
  artifactCollectionActions: ArtifactCollectionActionConnection;
  /** aliasName can be an alias (latest, v0, custom_alias), commitHash, or digest */
  artifactMembership?: Maybe<ArtifactCollectionMembership>;
  artifactMemberships: ArtifactCollectionMembershipConnection;
  artifacts: VersionedArtifactConnection;
  createdAt: Scalars['DateTime'];
  defaultArtifactType: ArtifactType;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latestArtifact?: Maybe<Artifact>;
  name: Scalars['String'];
  project: Project;
  state: ArtifactCollectionState;
  tags: TagConnection;
  triggers: TriggerConnection;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ArtifactSequenceAliasActionHistoryArgs = {
  after?: InputMaybe<Scalars['String']>;
  alias?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactSequenceAliasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactSequenceArtifactActionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactSequenceArtifactCollectionActionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactSequenceArtifactMembershipArgs = {
  aliasName: Scalars['String'];
};

export type ArtifactSequenceArtifactMembershipsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactSequenceArtifactsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactSequenceTagsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  tagCategoryName?: InputMaybe<Scalars['String']>;
};

export type ArtifactSequenceTriggersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactSequenceConnection = {
  __typename?: 'ArtifactSequenceConnection';
  edges: Array<ArtifactSequenceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ArtifactSequenceEdge = {
  __typename?: 'ArtifactSequenceEdge';
  cursor: Scalars['String'];
  node?: Maybe<ArtifactSequence>;
};

export type ArtifactSequenceStorageNode = StorageTreeNode & {
  __typename?: 'ArtifactSequenceStorageNode';
  artifactSequence: ArtifactSequence;
  artifactSequenceID: Scalars['ID'];
  artifactType: ArtifactType;
  artifacts: ArtifactStorageNodeConnection;
  id: Scalars['ID'];
  name: Scalars['String'];
  size: Scalars['Int64'];
};

export type ArtifactSequenceStorageNodeArtifactsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactSequenceStorageNodeConnection = {
  __typename?: 'ArtifactSequenceStorageNodeConnection';
  edges: Array<ArtifactSequenceStorageNodeEdge>;
  pageInfo: PageInfo;
  totalSize: Scalars['Int64'];
};

export type ArtifactSequenceStorageNodeEdge = {
  __typename?: 'ArtifactSequenceStorageNodeEdge';
  cursor: Scalars['String'];
  node: ArtifactSequenceStorageNode;
};

export enum ArtifactState {
  Committed = 'COMMITTED',
  Deleted = 'DELETED',
  Pending = 'PENDING',
}

export enum ArtifactStorageLayout {
  V1 = 'V1',
  V2 = 'V2',
}

export type ArtifactStorageNode = StorageTreeNode & {
  __typename?: 'ArtifactStorageNode';
  artifact: Artifact;
  artifactID: Scalars['ID'];
  id: Scalars['ID'];
  name: Scalars['String'];
  size: Scalars['Int64'];
};

export type ArtifactStorageNodeConnection = {
  __typename?: 'ArtifactStorageNodeConnection';
  edges: Array<ArtifactStorageNodeEdge>;
  pageInfo: PageInfo;
  totalSize: Scalars['Int64'];
};

export type ArtifactStorageNodeEdge = {
  __typename?: 'ArtifactStorageNodeEdge';
  cursor: Scalars['String'];
  node: ArtifactStorageNode;
};

export type ArtifactType = {
  __typename?: 'ArtifactType';
  artifact?: Maybe<Artifact>;
  artifactActions?: Maybe<ArtifactActionConnection>;
  artifactCollection?: Maybe<ArtifactCollection>;
  artifactCollections?: Maybe<ArtifactCollectionConnection>;
  artifactSequence?: Maybe<ArtifactSequence>;
  /** legacy: prefer artifactCollection */
  artifactSequences?: Maybe<ArtifactSequenceConnection>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  project: Project;
};

export type ArtifactTypeArtifactArgs = {
  name: Scalars['String'];
};

export type ArtifactTypeArtifactActionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ArtifactTypeArtifactCollectionArgs = {
  name: Scalars['String'];
};

export type ArtifactTypeArtifactCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  collectionTypes?: InputMaybe<Array<ArtifactCollectionType>>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactTypeArtifactSequenceArgs = {
  name: Scalars['String'];
};

export type ArtifactTypeArtifactSequencesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ArtifactTypeConnection = {
  __typename?: 'ArtifactTypeConnection';
  edges: Array<ArtifactTypeEdge>;
  pageInfo: PageInfo;
};

export type ArtifactTypeEdge = {
  __typename?: 'ArtifactTypeEdge';
  cursor: Scalars['String'];
  node?: Maybe<ArtifactType>;
};

export type ArtifactTypeStorageNode = StorageTreeNode & {
  __typename?: 'ArtifactTypeStorageNode';
  artifactType: ArtifactType;
  id: Scalars['ID'];
  name: Scalars['String'];
  size: Scalars['Int64'];
};

export type ArtifactUsedByApproxOrdering = {
  direction: OrderDir;
  key: ArtifactUsedByApproxOrderingKey;
};

export enum ArtifactUsedByApproxOrderingKey {
  CreatedAt = 'CREATED_AT',
}

export type AttachCustomerPaymentMethodInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  paymentMethod: Scalars['String'];
};

export type AttachCustomerPaymentMethodPayload = {
  __typename?: 'AttachCustomerPaymentMethodPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type BenchmarkRun = {
  __typename?: 'BenchmarkRun';
  benchmark: Project;
  createdAt: Scalars['DateTime'];
  details?: Maybe<Scalars['JSON']>;
  gitHubSubmissionPR?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isCodeHidden: Scalars['Boolean'];
  originalProject?: Maybe<Project>;
  originalRun?: Maybe<Run>;
  results?: Maybe<Scalars['String']>;
  run: Run;
  state: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type BenchmarkRunConnection = {
  __typename?: 'BenchmarkRunConnection';
  edges: Array<BenchmarkRunEdge>;
  pageInfo: PageInfo;
};

export type BenchmarkRunEdge = {
  __typename?: 'BenchmarkRunEdge';
  cursor: Scalars['String'];
  node?: Maybe<BenchmarkRun>;
};

export type BucketStoreConnectionError = Error & {
  __typename?: 'BucketStoreConnectionError';
  message: Scalars['String'];
  severity: ErrorSeverity;
};

/**
 * This exists for legacy queries that spread fragments on BucketType.
 * Nothing new should be added here
 */
export type BucketType = {
  commit?: Maybe<Scalars['String']>;
  config?: Maybe<Scalars['JSONString']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  exampleTable?: Maybe<Scalars['JSONString']>;
  exampleTableColumns?: Maybe<Scalars['JSONString']>;
  exampleTableTypes?: Maybe<Scalars['JSONString']>;
  fileCount?: Maybe<Scalars['Int']>;
  files?: Maybe<FileConnection>;
  framework?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  history: Array<Scalars['String']>;
  host?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  logLines?: Maybe<LogLineConnection>;
  name?: Maybe<Scalars['String']>;
  shouldStop?: Maybe<Scalars['Boolean']>;
  state?: Maybe<Scalars['String']>;
  summaryMetrics?: Maybe<Scalars['JSONString']>;
  sweep?: Maybe<Sweep>;
};

/**
 * This exists for legacy queries that spread fragments on BucketType.
 * Nothing new should be added here
 */
export type BucketTypeConfigArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * This exists for legacy queries that spread fragments on BucketType.
 * Nothing new should be added here
 */
export type BucketTypeFilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pattern?: InputMaybe<Scalars['String']>;
};

/**
 * This exists for legacy queries that spread fragments on BucketType.
 * Nothing new should be added here
 */
export type BucketTypeHistoryArgs = {
  maxStep?: InputMaybe<Scalars['Int64']>;
  minStep?: InputMaybe<Scalars['Int64']>;
  samples?: InputMaybe<Scalars['Int']>;
};

/**
 * This exists for legacy queries that spread fragments on BucketType.
 * Nothing new should be added here
 */
export type BucketTypeLogLinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/**
 * This exists for legacy queries that spread fragments on BucketType.
 * Nothing new should be added here
 */
export type BucketTypeSummaryMetricsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
  packVersion?: InputMaybe<Scalars['Int']>;
};

export type CancelCustomerSubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
};

export type CancelCustomerSubscriptionPayload = {
  __typename?: 'CancelCustomerSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export enum CardBrand {
  Amex = 'AMEX',
  Diners = 'DINERS',
  Discover = 'DISCOVER',
  Interac = 'INTERAC',
  Jcb = 'JCB',
  Mastercard = 'MASTERCARD',
  Unionpay = 'UNIONPAY',
  Unknown = 'UNKNOWN',
  Visa = 'VISA',
}

export type ClaimAnonymousEntityInput = {
  anonymousApiKey: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type ClaimAnonymousEntityPayload = {
  __typename?: 'ClaimAnonymousEntityPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  task: Task;
};

export type ClientIdMapping = {
  __typename?: 'ClientIDMapping';
  clientID: Scalars['ID'];
  entry: ClientIdMappingEntry;
  serverID: Scalars['ID'];
};

export type ClientIdMappingEntry = Artifact | ArtifactSequence;

export type CloneProjectsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  destinationEntityName: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  ownerUsername: Scalars['String'];
  projectNames?: InputMaybe<Array<Scalars['String']>>;
  sourceEntityName: Scalars['String'];
};

export type CloneProjectsPayload = {
  __typename?: 'CloneProjectsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  tasks: Array<Task>;
};

export enum CloudProvider {
  Aws = 'AWS',
  Azure = 'AZURE',
  Gcp = 'GCP',
  Minio = 'MINIO',
}

export type CloudRegion = {
  __typename?: 'CloudRegion';
  id: Scalars['ID'];
  provider: CloudProvider;
  region: Scalars['String'];
};

export type Code = {
  __typename?: 'Code';
  body?: Maybe<Scalars['String']>;
  directUrl: Scalars['String'];
  name: Scalars['String'];
};

export type CommitArtifactInput = {
  artifactID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type CommitArtifactPayload = {
  __typename?: 'CommitArtifactPayload';
  artifact: Artifact;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ContactUsForComputeHoursInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type ContactUsForComputeHoursPayload = {
  __typename?: 'ContactUsForComputeHoursPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ContactUsForUserLedTrialInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type ContactUsForUserLedTrialPayload = {
  __typename?: 'ContactUsForUserLedTrialPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CopyFileInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  id: Scalars['ID'];
  projectName: Scalars['String'];
  runName: Scalars['String'];
};

export type CopyFilePayload = {
  __typename?: 'CopyFilePayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateAwsExternalIdInput = {
  clientMutationID?: InputMaybe<Scalars['String']>;
  organizationID?: InputMaybe<Scalars['ID']>;
};

export type CreateAccessTokenInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  projects: Array<ProjectSpecifier>;
  username?: InputMaybe<Scalars['String']>;
  viewId: Scalars['ID'];
};

export type CreateAccessTokenPayload = {
  __typename?: 'CreateAccessTokenPayload';
  accessToken: AccessToken;
  clientMutationId?: Maybe<Scalars['String']>;
  recipientAlreadyOnTeam?: Maybe<Scalars['Boolean']>;
  toNewUser?: Maybe<Scalars['Boolean']>;
};

export type CreateAgentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  host: Scalars['String'];
  projectName?: InputMaybe<Scalars['String']>;
  sweep: Scalars['String'];
};

export type CreateAgentPayload = {
  __typename?: 'CreateAgentPayload';
  agent?: Maybe<Agent>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateAlertPayload = {
  __typename?: 'CreateAlertPayload';
  alert: Alert;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateAnonymousEntityInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type CreateArtifactCollectionPayload = {
  __typename?: 'CreateArtifactCollectionPayload';
  artifactCollection: ArtifactCollection;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateArtifactCollectionTagAssignmentInput = {
  artifactCollectionName: Scalars['String'];
  /** new tag name, allows alphanumeric chars, hyphens, underscores and spaces */
  attributes?: InputMaybe<Scalars['JSONString']>;
  clientMutationID?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  projectName: Scalars['String'];
  tagCategoryName?: InputMaybe<Scalars['String']>;
  /** new tag category name, allows alphanumeric chars, hyphens, underscores and spaces */
  tagName: Scalars['String'];
};

export type CreateArtifactFileSpecInput = {
  artifactID: Scalars['ID'];
  artifactManifestID?: InputMaybe<Scalars['ID']>;
  md5: Scalars['String'];
  mimetype?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateArtifactFilesInput = {
  artifactFiles: Array<CreateArtifactFileSpecInput>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  cloudRegionID?: InputMaybe<Scalars['ID']>;
  storageLayout?: ArtifactStorageLayout;
};

export type CreateArtifactFilesPayload = {
  __typename?: 'CreateArtifactFilesPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  files: FileConnection;
};

export type CreateArtifactFilesPayloadFilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type CreateArtifactInput = {
  aliases?: InputMaybe<Array<ArtifactAliasInput>>;
  artifactCollectionName?: InputMaybe<Scalars['String']>;
  artifactCollectionNames?: InputMaybe<Array<Scalars['String']>>;
  artifactTypeName: Scalars['String'];
  clientID?: InputMaybe<Scalars['ID']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  digest: Scalars['String'];
  digestAlgorithm: ArtifactDigestAlgorithm;
  distributedID?: InputMaybe<Scalars['String']>;
  enableDigestDeduplication?: InputMaybe<Scalars['Boolean']>;
  entityName: Scalars['String'];
  historyStep?: InputMaybe<Scalars['Int64']>;
  labels?: InputMaybe<Scalars['JSONString']>;
  metadata?: InputMaybe<Scalars['JSONString']>;
  projectName: Scalars['String'];
  /** deprecated */
  runName?: InputMaybe<Scalars['String']>;
  sequenceClientID?: InputMaybe<Scalars['ID']>;
};

export type CreateArtifactManifestInput = {
  artifactID: Scalars['ID'];
  baseArtifactID?: InputMaybe<Scalars['ID']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  digest: Scalars['String'];
  entityName: Scalars['String'];
  name: Scalars['String'];
  projectName: Scalars['String'];
  runName: Scalars['String'];
  type?: ArtifactManifestType;
};

export type CreateArtifactManifestPayload = {
  __typename?: 'CreateArtifactManifestPayload';
  artifactManifest: ArtifactManifest;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateArtifactPayload = {
  __typename?: 'CreateArtifactPayload';
  artifact: Artifact;
  artifactActions: Array<ArtifactAction>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateArtifactPortfolioInput = {
  artifactTypeID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  name: Scalars['String'];
  projectName: Scalars['String'];
};

export type CreateArtifactSequenceInput = {
  artifactTypeID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  name: Scalars['String'];
  projectName: Scalars['String'];
};

export type CreateArtifactTypeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  name: Scalars['String'];
  projectName: Scalars['String'];
};

export type CreateArtifactTypePayload = {
  __typename?: 'CreateArtifactTypePayload';
  artifactType: ArtifactType;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateBenchmarkDiscussionCommentInput = {
  body: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  discussionThreadID: Scalars['ID'];
  parentCommentID?: InputMaybe<Scalars['ID']>;
};

export type CreateBenchmarkDiscussionThreadInput = {
  benchmarkEntityName: Scalars['String'];
  benchmarkProjectName: Scalars['String'];
  body?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateClientIdMappingInput = {
  clientID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  serverID: Scalars['ID'];
};

export type CreateClientIdMappingPayload = {
  __typename?: 'CreateClientIDMappingPayload';
  clientIDMapping: ClientIdMapping;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateCustomChartInput = {
  access: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  displayName: Scalars['String'];
  entity: Scalars['String'];
  /** gorilla.ValidateCustomChartName */
  name: Scalars['String'];
  spec: Scalars['JSONString'];
  type: Scalars['String'];
};

export type CreateCustomChartPayload = {
  __typename?: 'CreateCustomChartPayload';
  chart: CustomChart;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateCustomerSubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  newOrganizationName: Scalars['String'];
  paymentMethod: Scalars['String'];
  planId: Scalars['ID'];
  quantity: Scalars['Int'];
  trial: Scalars['Boolean'];
};

export type CreateCustomerSubscriptionPayload = {
  __typename?: 'CreateCustomerSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  subscription?: Maybe<Scalars['JSON']>;
};

export type CreateCustomerTrialInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  newOrganizationName: Scalars['String'];
  planId: Scalars['ID'];
  quantity: Scalars['Int'];
  trialDays: Scalars['Int'];
  userName: Scalars['String'];
};

export type CreateCustomerTrialPayload = {
  __typename?: 'CreateCustomerTrialPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  subscription?: Maybe<Scalars['JSON']>;
};

export type CreateDefaultResourceConfigInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  config: Scalars['JSONString'];
  entityName: Scalars['String'];
  projectName?: InputMaybe<Scalars['String']>;
  resource: Scalars['String'];
};

export type CreateDefaultResourceConfigPayload = {
  __typename?: 'CreateDefaultResourceConfigPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  defaultResourceConfigID: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type CreateDiscussionCommentPayload = {
  __typename?: 'CreateDiscussionCommentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  discussionComment: DiscussionComment;
};

export type CreateDiscussionThreadPayload = {
  __typename?: 'CreateDiscussionThreadPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  discussionThread: DiscussionThread;
};

export type CreateEmailSubscriptionInput = {
  alertID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type CreateEmailSubscriptionPayload = {
  __typename?: 'CreateEmailSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  subscription: EmailSubscription;
};

export type CreateEntityInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  defaultAccess?: InputMaybe<Scalars['String']>;
  /** allows alphanumeric chars, hyphens, and underscores */
  defaultFramework?: InputMaybe<Scalars['String']>;
  /** deprecated */
  invited?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateEntityPayload = {
  __typename?: 'CreateEntityPayload';
  apiKey?: Maybe<ApiKey>;
  clientMutationId?: Maybe<Scalars['String']>;
  entity?: Maybe<Entity>;
};

export type CreateExperimentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  enrollmentPeriod: Scalars['Int'];
  experimentType: ExperimentType;
  metadata?: InputMaybe<Scalars['JSONString']>;
  name: Scalars['String'];
  observationalUnit: ObservationalUnit;
  sampleSize: Scalars['Int'];
  variants: Array<VariantInput>;
};

export type CreateExperimentPayload = {
  __typename?: 'CreateExperimentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type CreateFilterTriggerInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  enabled: Scalars['Boolean'];
  eventFilter: Scalars['JSONString'];
  name: Scalars['String'];
  scopeID: Scalars['ID'];
  scopeType: TriggerScopeType;
  triggeredActionConfig: TriggeredActionConfig;
  triggeredActionType: TriggeredActionType;
  triggeringEventType: EventTriggeringConditionType;
};

export type CreateFilterTriggerPayload = {
  __typename?: 'CreateFilterTriggerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  trigger?: Maybe<Trigger>;
};

export type CreateFinishedRunAlertInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  projectName?: InputMaybe<Scalars['String']>;
};

export type CreateGitHubOAuthIntegrationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  entityName: Scalars['String'];
  redirectURI: Scalars['String'];
  state: Scalars['String'];
};

export type CreateIntegrationPayload = {
  __typename?: 'CreateIntegrationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  integration: Integration;
};

export type CreateInviteInput = {
  accountType?: InputMaybe<Scalars['String']>;
  addSeat?: InputMaybe<Scalars['Boolean']>;
  /** deprecated */
  admin?: InputMaybe<Scalars['Boolean']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type CreateInvitePayload = {
  __typename?: 'CreateInvitePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  entity?: Maybe<Entity>;
  invite?: Maybe<Invite>;
  remainingSeats?: Maybe<Scalars['Int']>;
  remainingViewOnlySeats?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
};

export type CreateLaunchAgentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  hostname: Scalars['String'];
  projectName: Scalars['String'];
  runQueues: Array<Scalars['ID']>;
};

export type CreateLaunchAgentPayload = {
  __typename?: 'CreateLaunchAgentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  launchAgentId: Scalars['ID'];
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateLocalLicenseOrganizationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  newOrganizationName: Scalars['String'];
};

export type CreateLocalLicenseOrganizationPayload = {
  __typename?: 'CreateLocalLicenseOrganizationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  organization: Organization;
};

export type CreateNewsletterSubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
};

export type CreateNewsletterSubscriptionPayload = {
  __typename?: 'CreateNewsletterSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  newsletterSubscription: NewsletterSubscription;
};

export type CreatePreviewableLinkInput = {
  author: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  entityName: Scalars['String'];
  redirectURL: Scalars['String'];
  resourceID: Scalars['ID'];
  resourceType: PreviewableLinkResourceType;
  title: Scalars['String'];
  useDefaultImage: Scalars['Boolean'];
};

export type CreatePreviewableLinkPayload = {
  __typename?: 'CreatePreviewableLinkPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  link: Scalars['String'];
  previewImageUploadURL?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateRunQueueInput = {
  access: RunQueueAccessType;
  clientMutationId?: InputMaybe<Scalars['String']>;
  defaultResourceConfigID?: InputMaybe<Scalars['ID']>;
  entityName: Scalars['String'];
  projectName: Scalars['String'];
  queueName: Scalars['String'];
};

export type CreateRunQueuePayload = {
  __typename?: 'CreateRunQueuePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  queueID?: Maybe<Scalars['ID']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateScriptableRunAlertInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  projectName?: InputMaybe<Scalars['String']>;
};

export type CreateServiceAccountInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
};

export type CreateServiceAccountPayload = {
  __typename?: 'CreateServiceAccountPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CreateSlackChannelSubscriptionInput = {
  alertID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  integrationID: Scalars['ID'];
};

export type CreateSlackChannelSubscriptionPayload = {
  __typename?: 'CreateSlackChannelSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  subscription: SlackChannelSubscription;
};

export type CreateSlackIntegrationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  entityName: Scalars['String'];
  redirectURI: Scalars['String'];
};

export type CreateStoppedRunAlertInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  minimumRunDuration: Scalars['Duration'];
  projectName?: InputMaybe<Scalars['String']>;
};

export type CreateStorageSubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['ID']>;
  paymentMethod?: InputMaybe<Scalars['String']>;
  storagePlanId?: InputMaybe<Scalars['ID']>;
  trackingPlanId?: InputMaybe<Scalars['ID']>;
  trial?: InputMaybe<Scalars['Boolean']>;
};

export type CreateStorageSubscriptionPayload = {
  __typename?: 'CreateStorageSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  subscription?: Maybe<Scalars['JSON']>;
};

export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  clientMutationID?: Maybe<Scalars['String']>;
  tag: Tag;
};

export type CreateTeamInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Optionally, the organization this team belongs to. */
  defaultAccess?: InputMaybe<Scalars['String']>;
  /** Optionally, user name of the admin. Defaults to auth user. */
  organizationId?: InputMaybe<Scalars['String']>;
  storageBucketInfo?: InputMaybe<StorageBucketInfoInput>;
  /** new team name, allows alphanumeric chars, hyphens, and underscores */
  teamAdminUserName?: InputMaybe<Scalars['String']>;
  teamName: Scalars['String'];
};

export type CreateTeamPayload = {
  __typename?: 'CreateTeamPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  entity?: Maybe<Entity>;
};

export type CreateUserEmailInput = {
  email: Scalars['String'];
  type: EmailType;
};

export type CreateUserEmailPayload = {
  __typename?: 'CreateUserEmailPayload';
  email?: Maybe<Email>;
  success: Scalars['Boolean'];
};

export type CreateUserInput = {
  accountType?: InputMaybe<Scalars['String']>;
  admin?: InputMaybe<Scalars['Boolean']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type CreateUserLedTrialInput = {
  allowJoinMatchingEmailDomain?: InputMaybe<Scalars['Boolean']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  isAcademic: Scalars['Boolean'];
  justification?: InputMaybe<Scalars['String']>;
  newOrganizationName: Scalars['String'];
  newTeamName: Scalars['String'];
  orgSize: Scalars['String'];
  storageBucketInfo?: InputMaybe<StorageBucketInfoInput>;
};

export type CreateUserLedTrialPayload = {
  __typename?: 'CreateUserLedTrialPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  subscription?: Maybe<Scalars['JSON']>;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CreateViewCommentsAlertSubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  viewID: Scalars['ID'];
};

export type CreateViewDiscussionCommentInput = {
  body: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  discussionThreadID?: InputMaybe<Scalars['ID']>;
  inlineCommentDetails?: InputMaybe<Scalars['JSONString']>;
  notifyAllSubscribers?: InputMaybe<Scalars['Boolean']>;
  viewID: Scalars['ID'];
};

export type CreateViewDiscussionCommentPayload = {
  __typename?: 'CreateViewDiscussionCommentPayload';
  alertSubscription: AlertSubscription;
  clientMutationId?: Maybe<Scalars['String']>;
  discussionComment: DiscussionComment;
  discussionThread: DiscussionThread;
};

export type CustomChart = {
  __typename?: 'CustomChart';
  access: Scalars['String'];
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  entity: Entity;
  id: Scalars['ID'];
  name: Scalars['String'];
  spec: Scalars['JSONString'];
  type: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type CustomChartConnection = {
  __typename?: 'CustomChartConnection';
  edges: Array<CustomChartEdge>;
  pageInfo: PageInfo;
};

export type CustomChartEdge = {
  __typename?: 'CustomChartEdge';
  cursor: Scalars['String'];
  node: CustomChart;
};

export enum DagDirection {
  AwayFromArtifact = 'AwayFromArtifact',
  TowardArtifact = 'TowardArtifact',
}

export type DefaultResourceConfig = {
  __typename?: 'DefaultResourceConfig';
  config?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  resource: Scalars['String'];
  scope: DefaultResourceConfigScope;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DefaultResourceConfigConnection = {
  __typename?: 'DefaultResourceConfigConnection';
  edges: Array<DefaultResourceConfigEdge>;
  pageInfo: PageInfo;
};

export type DefaultResourceConfigEdge = {
  __typename?: 'DefaultResourceConfigEdge';
  cursor: Scalars['String'];
  node: DefaultResourceConfig;
};

export type DefaultResourceConfigScope = {
  __typename?: 'DefaultResourceConfigScope';
  ID: Scalars['Int'];
  Type: DefaultResourceConfigScopeType;
};

export enum DefaultResourceConfigScopeType {
  Entity = 'ENTITY',
  Project = 'PROJECT',
}

export type DeleteAlertInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteAlertPayload = {
  __typename?: 'DeleteAlertPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteAlertSubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteAlertSubscriptionPayload = {
  __typename?: 'DeleteAlertSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteAliasesInput = {
  aliases: Array<ArtifactCollectionAliasInput>;
  artifactID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type DeleteAliasesPayload = {
  __typename?: 'DeleteAliasesPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteApiKeyInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type DeleteApiKeyPayload = {
  __typename?: 'DeleteApiKeyPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteArtifactAction = ArtifactAction & {
  __typename?: 'DeleteArtifactAction';
  artifact: Artifact;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  initiator: Initiator;
};

export type DeleteArtifactCollectionPayload = {
  __typename?: 'DeleteArtifactCollectionPayload';
  artifactCollection: ArtifactCollection;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteArtifactCollectionTagAssignmentInput = {
  artifactCollectionName: Scalars['String'];
  clientMutationID?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  projectName: Scalars['String'];
  tagCategoryName?: InputMaybe<Scalars['String']>;
  tagName: Scalars['String'];
};

export type DeleteArtifactInput = {
  artifactID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  deleteAliases?: InputMaybe<Scalars['Boolean']>;
};

export type DeleteArtifactPayload = {
  __typename?: 'DeleteArtifactPayload';
  artifact: Artifact;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteArtifactPortfolioInput = {
  artifactPortfolioID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type DeleteArtifactSequenceInput = {
  artifactSequenceID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type DeleteCustomChartInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entity: Scalars['String'];
  name: Scalars['String'];
};

export type DeleteCustomChartPayload = {
  __typename?: 'DeleteCustomChartPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteDefaultResourceConfigsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  defaultResourceConfigIDs: Array<Scalars['ID']>;
};

export type DeleteDefaultResourceConfigsPayload = {
  __typename?: 'DeleteDefaultResourceConfigsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  numAffected: Scalars['Int64'];
  success: Scalars['Boolean'];
};

export type DeleteDiscussionCommentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  deleteThread?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type DeleteDiscussionCommentPayload = {
  __typename?: 'DeleteDiscussionCommentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteEntityInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type DeleteEntityPayload = {
  __typename?: 'DeleteEntityPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteExperimentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteExperimentPayload = {
  __typename?: 'DeleteExperimentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type DeleteFilesInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  files: Array<Scalars['ID']>;
};

export type DeleteFilesPayload = {
  __typename?: 'DeleteFilesPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteFromRunQueueInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  queueID: Scalars['ID'];
  runQueueItemId: Scalars['ID'];
};

export type DeleteFromRunQueuePayload = {
  __typename?: 'DeleteFromRunQueuePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteIntegrationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteIntegrationPayload = {
  __typename?: 'DeleteIntegrationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteInviteInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type DeleteInvitePayload = {
  __typename?: 'DeleteInvitePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteLaunchAgentsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  launchAgentIds: Array<Scalars['ID']>;
};

export type DeleteLaunchAgentsPayload = {
  __typename?: 'DeleteLaunchAgentsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteModelInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};

export type DeleteModelPayload = {
  __typename?: 'DeleteModelPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteRunInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  deleteArtifacts?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type DeleteRunPayload = {
  __typename?: 'DeleteRunPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteRunQueuesInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  queueIDs: Array<Scalars['ID']>;
};

export type DeleteRunQueuesPayload = {
  __typename?: 'DeleteRunQueuesPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteRunsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  deleteArtifacts?: InputMaybe<Scalars['Boolean']>;
  entityName: Scalars['String'];
  filters: Scalars['JSONString'];
  projectName: Scalars['String'];
};

export type DeleteRunsPayload = {
  __typename?: 'DeleteRunsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
};

export type DeleteSweepInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  deleteRuns: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type DeleteSweepsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  deleteRuns: Scalars['Boolean'];
  ids: Array<Scalars['ID']>;
};

export type DeleteSweepsPayload = {
  __typename?: 'DeleteSweepsPayload';
  affectedAgents: Scalars['Int'];
  affectedRuns: Scalars['Int'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteTagAssignmentPayload = {
  __typename?: 'DeleteTagAssignmentPayload';
  clientMutationID?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteTeamInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  teamName: Scalars['String'];
};

export type DeleteTeamPayload = {
  __typename?: 'DeleteTeamPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteTriggerInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  triggerID: Scalars['ID'];
};

export type DeleteTriggerPayload = {
  __typename?: 'DeleteTriggerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteUserEmailInput = {
  id: Scalars['ID'];
};

export type DeleteUserEmailPayload = {
  __typename?: 'DeleteUserEmailPayload';
  email?: Maybe<Email>;
  success: Scalars['Boolean'];
};

export type DeleteUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type DeleteViewInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  deleteDrafts?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type DeleteViewPayload = {
  __typename?: 'DeleteViewPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  pendingDrafts?: Maybe<Scalars['Boolean']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteViewsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  deleteDrafts?: InputMaybe<Scalars['Boolean']>;
  ids: Array<Scalars['ID']>;
};

export type DeleteViewsPayload = {
  __typename?: 'DeleteViewsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  pendingDrafts?: Maybe<Scalars['Boolean']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteWorkflowsAdminInput = {
  adminType: WorkflowsAdminType;
  clientMutationID?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  username: Scalars['String'];
};

export type DeleteWorkflowsAdminPayload = {
  __typename?: 'DeleteWorkflowsAdminPayload';
  clientMutationID?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DetachCustomerPaymentMethodInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  paymentMethod: Scalars['String'];
};

export type DetachCustomerPaymentMethodPayload = {
  __typename?: 'DetachCustomerPaymentMethodPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export enum DiffOperation {
  Delete = 'DELETE',
  Insert = 'INSERT',
  Update = 'UPDATE',
}

export type DiscussionComment = {
  __typename?: 'DiscussionComment';
  body: Scalars['String'];
  childComments: DiscussionCommentConnection;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isParent: Scalars['Boolean'];
  parentComment?: Maybe<DiscussionComment>;
  poster: User;
  updatedAt?: Maybe<Scalars['DateTime']>;
  upvotes: Scalars['Int'];
};

export type DiscussionCommentChildCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type DiscussionCommentConnection = {
  __typename?: 'DiscussionCommentConnection';
  edges: Array<DiscussionCommentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type DiscussionCommentEdge = {
  __typename?: 'DiscussionCommentEdge';
  cursor: Scalars['String'];
  node: DiscussionComment;
};

export type DiscussionThread = {
  __typename?: 'DiscussionThread';
  body: Scalars['String'];
  comments: DiscussionCommentConnection;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  poster: User;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  upvotes: Scalars['Int'];
};

export type DiscussionThreadCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type DiscussionThreadConnection = {
  __typename?: 'DiscussionThreadConnection';
  edges: Array<DiscussionThreadEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type DiscussionThreadEdge = {
  __typename?: 'DiscussionThreadEdge';
  cursor: Scalars['String'];
  node: DiscussionThread;
};

export type DismissedBanner = {
  __typename?: 'DismissedBanner';
  dismissedAt: Scalars['DateTime'];
  id: Scalars['ID'];
};

export enum DotBehavior {
  KeepAllDotValues = 'KEEP_ALL_DOT_VALUES',
  SkipFirstDotValue = 'SKIP_FIRST_DOT_VALUE',
}

export type Email = {
  __typename?: 'Email';
  createdAt: Scalars['DateTime'];
  emailAddress: Scalars['String'];
  id: Scalars['ID'];
  identities: Array<Identity>;
  type: EmailType;
  verified: Scalars['Boolean'];
};

export type EmailSubscription = AlertSubscription & {
  __typename?: 'EmailSubscription';
  id: Scalars['ID'];
};

export enum EmailType {
  Academic = 'ACADEMIC',
  Corporate = 'CORPORATE',
  Personal = 'PERSONAL',
}

export type Entity = Node & {
  __typename?: 'Entity';
  accessTokens: Array<AccessToken>;
  artifactCollections?: Maybe<ArtifactCollectionConnection>;
  available?: Maybe<Scalars['Boolean']>;
  claimedEntities?: Maybe<EntityConnection>;
  claimingEntity?: Maybe<Entity>;
  codeSavingEnabled: Scalars['Boolean'];
  computeHours: Scalars['Duration'];
  createdAt: Scalars['DateTime'];
  dailyRunCount: Array<Scalars['Int']>;
  defaultAccess: Scalars['String'];
  defaultAlerts: Array<Alert>;
  defaultResourceConfig?: Maybe<DefaultResourceConfig>;
  defaultResourceConfigs?: Maybe<DefaultResourceConfigConnection>;
  id: Scalars['ID'];
  integrations?: Maybe<IntegrationConnection>;
  invitedTeam?: Maybe<Scalars['String']>;
  invites?: Maybe<InviteConnection>;
  isPaid?: Maybe<Scalars['Boolean']>;
  isTeam: Scalars['Boolean'];
  latestRuns?: Maybe<RunConnection>;
  limits?: Maybe<Scalars['JSONString']>;
  memberCount: Scalars['Int'];
  members: Array<Member>;
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['ID']>;
  photoUploadUrl: Scalars['String'];
  photoUrl?: Maybe<Scalars['String']>;
  privateOnly: Scalars['Boolean'];
  profileView?: Maybe<View>;
  projects?: Maybe<ProjectConnection>;
  protectedAliases: Array<Scalars['String']>;
  rateLimits?: Maybe<RateLimits>;
  readOnly?: Maybe<Scalars['Boolean']>;
  readOnlyAdmin: Scalars['Boolean'];
  referenceBytes: Scalars['Int64'];
  repos?: Maybe<RepoConnection>;
  runCount: Scalars['Int'];
  runs?: Maybe<RunConnection>;
  settings: EntitySettings;
  storageBytes: Scalars['Int64'];
  storageTree?: Maybe<EntityStorageNode>;
  subscriptionId?: Maybe<Scalars['Int']>;
  tagCategories: Array<TagCategory>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uploadHeaders: Array<Scalars['String']>;
  user?: Maybe<User>;
  userStats?: Maybe<EntityUserConnection>;
  workflowsAdmins: Array<User>;
};

export type EntityArtifactCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  collectionTypes?: InputMaybe<Array<ArtifactCollectionType>>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type EntityClaimedEntitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type EntityComputeHoursArgs = {
  minDaysOld?: InputMaybe<Scalars['Int']>;
};

export type EntityDailyRunCountArgs = {
  limit: Scalars['Int'];
};

export type EntityDefaultResourceConfigArgs = {
  id: Scalars['ID'];
};

export type EntityDefaultResourceConfigsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type EntityIntegrationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type EntityInvitesArgs = {
  after?: InputMaybe<Scalars['String']>;
  batchSize?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keysOnly?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type EntityProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type EntityProtectedAliasesArgs = {
  adminType: WorkflowsAdminType;
};

export type EntityReposArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type EntityRunCountArgs = {
  filters?: InputMaybe<Scalars['JSONString']>;
};

export type EntityRunsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type EntityStorageTreeArgs = {
  enableReferenceTracking?: InputMaybe<Scalars['Boolean']>;
};

export type EntityUserStatsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  from: Scalars['DateTime'];
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['DateTime']>;
};

export type EntityWorkflowsAdminsArgs = {
  adminType: WorkflowsAdminType;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges: Array<EntityEdge>;
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor: Scalars['String'];
  node?: Maybe<Entity>;
};

export type EntitySettings = {
  __typename?: 'EntitySettings';
  defaultCloudRegion: CloudRegion;
  entityProfileEnabled: Scalars['Boolean'];
  membersCanInvite?: Maybe<Scalars['Boolean']>;
  openToMatchingOrgEmailDomainUsers?: Maybe<Scalars['Boolean']>;
  storageBucketInfo?: Maybe<StorageBucketInfo>;
};

export type EntitySettingsInput = {
  defaultCloudRegionID?: InputMaybe<Scalars['String']>;
  entityProfileEnabled?: InputMaybe<Scalars['Boolean']>;
  membersCanInvite?: InputMaybe<Scalars['Boolean']>;
  openToMatchingOrgEmailDomainUsers?: InputMaybe<Scalars['Boolean']>;
};

export type EntityStorageNode = StorageTreeNode & {
  __typename?: 'EntityStorageNode';
  entity: Entity;
  entityID: Scalars['ID'];
  id: Scalars['ID'];
  name: Scalars['String'];
  projects: ProjectStorageNodeConnection;
  size: Scalars['Int64'];
};

export type EntityStorageNodeProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type EntityUser = Node & {
  __typename?: 'EntityUser';
  id: Scalars['ID'];
  runCount: Scalars['Int'];
  user: User;
};

export type EntityUserConnection = {
  __typename?: 'EntityUserConnection';
  /** pageInfo: PageInfo! */
  edges: Array<EntityUserEdge>;
};

export type EntityUserEdge = {
  __typename?: 'EntityUserEdge';
  cursor: Scalars['String'];
  node?: Maybe<EntityUser>;
};

export type Error = {
  message: Scalars['String'];
};

export enum ErrorSeverity {
  Error = 'ERROR',
  Warn = 'WARN',
}

export type Event = {
  __typename?: 'Event';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  entityName?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  /** pageInfo: PageInfo! */
  edges: Array<EventEdge>;
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String'];
  node?: Maybe<Event>;
};

/** | Entity */
export enum EventTriggeringConditionType {
  AddArtifactAlias = 'ADD_ARTIFACT_ALIAS',
  CreateArtifact = 'CREATE_ARTIFACT',
  LinkModel = 'LINK_MODEL',
  UpdateArtifactAlias = 'UPDATE_ARTIFACT_ALIAS',
}

export type Experiment = Node & {
  __typename?: 'Experiment';
  endAt?: Maybe<Scalars['DateTime']>;
  enrollmentPeriod: Scalars['Int'];
  experimentType: ExperimentType;
  id: Scalars['ID'];
  metadata?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  observationalUnit: ObservationalUnit;
  sampleSize: Scalars['Int'];
  startAt?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
  variants: Array<Variant>;
};

export enum ExperimentType {
  AbTest = 'AB_TEST',
  FeatureFlag = 'FEATURE_FLAG',
}

export type FailRunQueueItemInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  info?: InputMaybe<Scalars['JSONString']>;
  runQueueItemId: Scalars['ID'];
};

export type FailRunQueueItemPayload = {
  __typename?: 'FailRunQueueItemPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type File = Node & {
  __typename?: 'File';
  archived?: Maybe<Scalars['Boolean']>;
  artifact?: Maybe<Artifact>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  digest?: Maybe<Scalars['String']>;
  directUrl: Scalars['String'];
  displayName: Scalars['String'];
  exists: Scalars['Boolean'];
  id: Scalars['ID'];
  isReference: Scalars['Boolean'];
  md5?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** @deprecated Use id instead */
  ndbId?: Maybe<Scalars['ID']>;
  sizeBytes: Scalars['Int64'];
  special?: Maybe<Scalars['Boolean']>;
  storageBucket?: Maybe<Scalars['String']>;
  storagePath?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uploadHeaders: Array<Scalars['String']>;
  uploadUrl?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type FileUrlArgs = {
  upload?: InputMaybe<Scalars['Boolean']>;
};

export type FileConnection = {
  __typename?: 'FileConnection';
  edges: Array<FileEdge>;
  pageInfo: PageInfo;
  uploadHeaders: Array<Scalars['String']>;
};

export type FileEdge = {
  __typename?: 'FileEdge';
  cursor: Scalars['String'];
  node?: Maybe<File>;
};

export type FileStorageNode = StorageTreeNode & {
  __typename?: 'FileStorageNode';
  file: File;
  fileID: Scalars['ID'];
  id: Scalars['ID'];
  name: Scalars['String'];
  size: Scalars['Int64'];
};

export type FileStorageNodeConnection = {
  __typename?: 'FileStorageNodeConnection';
  edges: Array<FileStorageNodeEdge>;
  pageInfo: PageInfo;
  totalSize: Scalars['Int64'];
};

export type FileStorageNodeEdge = {
  __typename?: 'FileStorageNodeEdge';
  cursor: Scalars['String'];
  node: FileStorageNode;
};

/** | CronTriggeringCondition */
export type FilterEventTriggeringCondition = {
  __typename?: 'FilterEventTriggeringCondition';
  eventType: EventTriggeringConditionType;
  filter: Scalars['String'];
};

export type FinishedRunCondition = {
  __typename?: 'FinishedRunCondition';
  /** GraphQL doesn't allow empty types, so this always returns true */
  success: Scalars['Boolean'];
};

export type GenerateApiKeyInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
};

export type GenerateApiKeyPayload = {
  __typename?: 'GenerateApiKeyPayload';
  apiKey?: Maybe<ApiKey>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type GenerateLocalLicenseInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  customerName: Scalars['String'];
  expDuration: Scalars['Int'];
  flags: Array<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  seats: Scalars['Int'];
  storageGigs: Scalars['Int'];
  teams: Scalars['Int'];
};

export type GenerateLocalLicensePayload = {
  __typename?: 'GenerateLocalLicensePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  localLicense: LocalLicense;
};

export type GitHubOAuthIntegration = Integration & {
  __typename?: 'GitHubOAuthIntegration';
  id: Scalars['ID'];
};

export type GitInfo = {
  __typename?: 'GitInfo';
  commit?: Maybe<Scalars['String']>;
  remote?: Maybe<Scalars['String']>;
};

export type GroupAggregation = {
  custom: Array<AggregationKey>;
  default: Aggregation;
};

export enum HistoryKeysFormat {
  Bitmap = 'BITMAP',
  Plaintext = 'PLAINTEXT',
}

export type HubSettingsInput = {
  disk?: InputMaybe<Scalars['String']>;
  dockerEnabled?: InputMaybe<Scalars['Boolean']>;
  image?: InputMaybe<Scalars['String']>;
  redisEnabled?: InputMaybe<Scalars['Boolean']>;
  repo?: InputMaybe<Scalars['String']>;
};

export type Identity = {
  __typename?: 'Identity';
  emailIdentityVerified: Scalars['Boolean'];
  id: Scalars['ID'];
  provider?: Maybe<Scalars['String']>;
};

export type ImageUrl = {
  __typename?: 'ImageUrl';
  path?: Maybe<Scalars['String']>;
  publicUrl?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Initiator = Run | User;

export type InputArtifactConnection = ArtifactConnectionType & {
  __typename?: 'InputArtifactConnection';
  edges: Array<InputArtifactEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type InputArtifactEdge = ArtifactEdgeType & {
  __typename?: 'InputArtifactEdge';
  cursor: Scalars['String'];
  node?: Maybe<Artifact>;
  usedAs: Array<Scalars['String']>;
};

export type InsertGalleryDiscussionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  reportID: Scalars['ID'];
  sendEmail?: InputMaybe<Scalars['Boolean']>;
  spec: Scalars['String'];
};

export type InsertGalleryDiscussionPayload = {
  __typename?: 'InsertGalleryDiscussionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type IntRange = {
  __typename?: 'IntRange';
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
};

export type Integration = {
  id: Scalars['ID'];
};

export type IntegrationConnection = {
  __typename?: 'IntegrationConnection';
  edges: Array<IntegrationEdge>;
  pageInfo: PageInfo;
};

export type IntegrationEdge = {
  __typename?: 'IntegrationEdge';
  cursor: Scalars['String'];
  node?: Maybe<Integration>;
};

export type Invite = {
  __typename?: 'Invite';
  accepted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  entity?: Maybe<Entity>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  fromUser?: Maybe<User>;
  id: Scalars['ID'];
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  toUser?: Maybe<User>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type InviteConnection = {
  __typename?: 'InviteConnection';
  edges: Array<InviteEdge>;
  pageInfo: PageInfo;
};

export type InviteEdge = {
  __typename?: 'InviteEdge';
  cursor: Scalars['String'];
  node?: Maybe<Invite>;
};

export type LaunchAgent = {
  __typename?: 'LaunchAgent';
  agentStatus: Scalars['String'];
  createdAt: Scalars['DateTime'];
  heartbeatAt?: Maybe<Scalars['DateTime']>;
  hostname: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  runQueues: Array<Scalars['ID']>;
  stopPolling: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LicenseClaims = {
  __typename?: 'LicenseClaims';
  expiresAt: Scalars['Int64'];
  flags: Array<Scalars['String']>;
  seats: Scalars['Int'];
  storageGigs: Scalars['Int'];
  teams: Scalars['Int'];
};

export type LicenseExpirationUi = {
  __typename?: 'LicenseExpirationUI';
  bannerDaysRemaining: Scalars['Int'];
  bannerTotalDays: Scalars['Int'];
  renewUrl?: Maybe<Scalars['String']>;
};

export type LinkArtifactInput = {
  aliases?: InputMaybe<Array<ArtifactAliasInput>>;
  artifactID?: InputMaybe<Scalars['ID']>;
  artifactPortfolioID?: InputMaybe<Scalars['ID']>;
  artifactPortfolioName?: InputMaybe<Scalars['String']>;
  clientID?: InputMaybe<Scalars['ID']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  projectName?: InputMaybe<Scalars['String']>;
};

export type LinkArtifactPayload = {
  __typename?: 'LinkArtifactPayload';
  aliases: Array<ArtifactCollectionAlias>;
  artifactCollectionID: Scalars['ID'];
  artifactID: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  versionIndex?: Maybe<Scalars['Int']>;
};

export type LinkTeamToOrganizationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  organizationID: Scalars['ID'];
};

export type LinkTeamToOrganizationPayload = {
  __typename?: 'LinkTeamToOrganizationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LocalLicense = Node & {
  __typename?: 'LocalLicense';
  claims: LicenseClaims;
  contactEmail: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customerName: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  generatedBy: User;
  id: Scalars['ID'];
  license: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LocalVersionInfo = {
  __typename?: 'LocalVersionInfo';
  latestVersionString: Scalars['String'];
  outOfDate: Scalars['Boolean'];
  versionOnThisInstanceString: Scalars['String'];
};

export type LogLine = {
  __typename?: 'LogLine';
  id?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  line?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['String']>;
};

export type LogLineConnection = {
  __typename?: 'LogLineConnection';
  edges: Array<LogLineEdge>;
  pageInfo: PageInfo;
};

export type LogLineEdge = {
  __typename?: 'LogLineEdge';
  cursor: Scalars['String'];
  node: LogLine;
};

export type Member = {
  __typename?: 'Member';
  accountType?: Maybe<Scalars['String']>;
  /** @deprecated Use `role` instead. */
  admin?: Maybe<Scalars['Boolean']>;
  apiKey?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  pending?: Maybe<Scalars['Boolean']>;
  photoUrl?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type ModifyRunsInput = {
  addTags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  /** deprecated */
  filters?: InputMaybe<Scalars['JSONString']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  projectName?: InputMaybe<Scalars['String']>;
  removeTags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ModifyRunsPayload = {
  __typename?: 'ModifyRunsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  runs: Array<Maybe<Run>>;
  runsSQL: Array<Maybe<Run>>;
};

export type MoveArtifactAliasAction = ArtifactAction & {
  __typename?: 'MoveArtifactAliasAction';
  artifact: Artifact;
  createdAt: Scalars['DateTime'];
  destinationArtifact?: Maybe<Artifact>;
  id: Scalars['ID'];
  initiator: Initiator;
};

export type MoveArtifactCollectionPayload = {
  __typename?: 'MoveArtifactCollectionPayload';
  artifactCollection?: Maybe<ArtifactCollection>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type MoveArtifactSequenceInput = {
  artifactSequenceID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  destinationArtifactTypeName: Scalars['String'];
};

export type MoveProjectsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  destinationEntityName: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  ownerUsername: Scalars['String'];
  projectNames?: InputMaybe<Array<Scalars['String']>>;
  sourceEntityName: Scalars['String'];
};

export type MoveProjectsPayload = {
  __typename?: 'MoveProjectsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  tasks: Array<Task>;
};

export type MoveRunsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  destinationEntityName: Scalars['String'];
  destinationProjectName: Scalars['String'];
  filters: Scalars['JSONString'];
  sourceEntityName: Scalars['String'];
  sourceProjectName: Scalars['String'];
};

export type MoveRunsPayload = {
  __typename?: 'MoveRunsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  task: Task;
};

export type MoveTagCategoryInput = {
  clientMutationID?: InputMaybe<Scalars['String']>;
  newEntityName: Scalars['String'];
  oldEntityName: Scalars['String'];
  tagCategoryName: Scalars['String'];
};

export type MoveTagInput = {
  clientMutationID?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  newTagCategoryName: Scalars['String'];
  oldTagCategoryName: Scalars['String'];
  tagName: Scalars['String'];
};

export type MoveViewInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  id: Scalars['ID'];
  projectName: Scalars['String'];
};

export type MoveViewPayload = {
  __typename?: 'MoveViewPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  ackRunQueueItem?: Maybe<AckRunQueueItemPayload>;
  addAliases?: Maybe<AddAliasesPayload>;
  /**
   * updateJob(input: UpdateJobInput!): UpdateJobPayload
   * deleteBucket(input: DeleteBucketInput!): DeleteBucketPayload
   */
  addFiles?: Maybe<AddFilesPayload>;
  addProtectedAliases?: Maybe<AddProtectedAliasesPayload>;
  addUserToOrganization?: Maybe<AddUserToOrganizationPayload>;
  addWorkflowsAdmin?: Maybe<AddWorkflowsAdminPayload>;
  agentHeartbeat?: Maybe<AgentHeartbeatPayload>;
  attachCustomerPaymentMethod?: Maybe<AttachCustomerPaymentMethodPayload>;
  cancelCustomerSubscription?: Maybe<CancelCustomerSubscriptionPayload>;
  claimAnonymousEntity?: Maybe<ClaimAnonymousEntityPayload>;
  cloneProjects?: Maybe<CloneProjectsPayload>;
  commitArtifact?: Maybe<CommitArtifactPayload>;
  contactUsForComputeHours?: Maybe<ContactUsForComputeHoursPayload>;
  contactUsForUserLedTrial?: Maybe<ContactUsForUserLedTrialPayload>;
  copyFile?: Maybe<CopyFilePayload>;
  createAWSExternalID: Scalars['String'];
  createAccessToken?: Maybe<CreateAccessTokenPayload>;
  createAgent?: Maybe<CreateAgentPayload>;
  createAnonymousEntity?: Maybe<CreateEntityPayload>;
  createArtifact?: Maybe<CreateArtifactPayload>;
  createArtifactCollectionTagAssignment?: Maybe<CreateTagPayload>;
  createArtifactFiles?: Maybe<CreateArtifactFilesPayload>;
  createArtifactManifest?: Maybe<CreateArtifactManifestPayload>;
  createArtifactPortfolio?: Maybe<CreateArtifactCollectionPayload>;
  createArtifactSequence?: Maybe<CreateArtifactCollectionPayload>;
  createArtifactType?: Maybe<CreateArtifactTypePayload>;
  createBenchmarkDiscussionComment?: Maybe<CreateDiscussionCommentPayload>;
  createBenchmarkDiscussionThread?: Maybe<CreateDiscussionThreadPayload>;
  createClientIDMapping?: Maybe<CreateClientIdMappingPayload>;
  createCustomChart?: Maybe<CreateCustomChartPayload>;
  createCustomerSubscription?: Maybe<CreateCustomerSubscriptionPayload>;
  createCustomerTrial?: Maybe<CreateCustomerTrialPayload>;
  createDefaultResourceConfig?: Maybe<CreateDefaultResourceConfigPayload>;
  createEmailSubscription?: Maybe<CreateEmailSubscriptionPayload>;
  createEntity?: Maybe<CreateEntityPayload>;
  createExperiment?: Maybe<CreateExperimentPayload>;
  createFilterTrigger?: Maybe<CreateFilterTriggerPayload>;
  createFinishedRunAlert?: Maybe<CreateAlertPayload>;
  createGitHubOAuthIntegration?: Maybe<CreateIntegrationPayload>;
  createInvite?: Maybe<CreateInvitePayload>;
  createLaunchAgent?: Maybe<CreateLaunchAgentPayload>;
  createLocalLicenseOrganization?: Maybe<CreateLocalLicenseOrganizationPayload>;
  createNewsletterSubscription?: Maybe<CreateNewsletterSubscriptionPayload>;
  createPreviewableLink?: Maybe<CreatePreviewableLinkPayload>;
  createRunQueue?: Maybe<CreateRunQueuePayload>;
  createScriptableRunAlert?: Maybe<CreateAlertPayload>;
  createServiceAccount?: Maybe<CreateServiceAccountPayload>;
  createSlackChannelSubscription?: Maybe<CreateSlackChannelSubscriptionPayload>;
  createSlackIntegration?: Maybe<CreateIntegrationPayload>;
  createStoppedRunAlert?: Maybe<CreateAlertPayload>;
  createStorageSubscription?: Maybe<CreateStorageSubscriptionPayload>;
  /** mutation to enable wandb admin to create teams given teamAdminUserName and new teamName */
  createTeam?: Maybe<CreateTeamPayload>;
  createUser?: Maybe<CreateUserPayload>;
  createUserLedTrial?: Maybe<CreateUserLedTrialPayload>;
  createViewCommentsAlertSubscription?: Maybe<CreateEmailSubscriptionPayload>;
  createViewDiscussionComment?: Maybe<CreateViewDiscussionCommentPayload>;
  deleteAlert?: Maybe<DeleteAlertPayload>;
  deleteAlertSubscription?: Maybe<DeleteAlertSubscriptionPayload>;
  deleteAliases?: Maybe<DeleteAliasesPayload>;
  deleteApiKey?: Maybe<DeleteApiKeyPayload>;
  deleteArtifact?: Maybe<DeleteArtifactPayload>;
  deleteArtifactCollectionTagAssignment?: Maybe<DeleteTagAssignmentPayload>;
  deleteArtifactPortfolio?: Maybe<DeleteArtifactCollectionPayload>;
  deleteArtifactSequence?: Maybe<DeleteArtifactCollectionPayload>;
  deleteCustomChart?: Maybe<DeleteCustomChartPayload>;
  deleteDefaultResourceConfigs?: Maybe<DeleteDefaultResourceConfigsPayload>;
  deleteDiscussionComment?: Maybe<DeleteDiscussionCommentPayload>;
  deleteEntity?: Maybe<DeleteEntityPayload>;
  deleteExperiment?: Maybe<DeleteExperimentPayload>;
  deleteFiles?: Maybe<DeleteFilesPayload>;
  deleteFromRunQueue?: Maybe<DeleteFromRunQueuePayload>;
  deleteIntegration?: Maybe<DeleteIntegrationPayload>;
  deleteInvite?: Maybe<DeleteInvitePayload>;
  deleteLaunchAgents?: Maybe<DeleteLaunchAgentsPayload>;
  deleteModel?: Maybe<DeleteModelPayload>;
  deleteRun?: Maybe<DeleteRunPayload>;
  deleteRunQueues?: Maybe<DeleteRunQueuesPayload>;
  deleteRuns?: Maybe<DeleteRunsPayload>;
  deleteSweep?: Maybe<DeleteSweepsPayload>;
  deleteSweeps?: Maybe<DeleteSweepsPayload>;
  deleteTeam?: Maybe<DeleteTeamPayload>;
  deleteTrigger?: Maybe<DeleteTriggerPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  deleteUserEmail?: Maybe<DeleteUserEmailPayload>;
  deleteView?: Maybe<DeleteViewPayload>;
  deleteViews?: Maybe<DeleteViewsPayload>;
  deleteWorkflowsAdmin?: Maybe<DeleteWorkflowsAdminPayload>;
  detachCustomerPaymentMethod?: Maybe<DetachCustomerPaymentMethodPayload>;
  failRunQueueItem?: Maybe<FailRunQueueItemPayload>;
  generateApiKey?: Maybe<GenerateApiKeyPayload>;
  generateLocalLicense?: Maybe<GenerateLocalLicensePayload>;
  insertGalleryDiscussion?: Maybe<InsertGalleryDiscussionPayload>;
  linkArtifact?: Maybe<LinkArtifactPayload>;
  linkTeamToOrganization?: Maybe<LinkTeamToOrganizationPayload>;
  /** launchRun(input: LaunchRunInput!): LaunchRunPayload */
  modifyRuns?: Maybe<ModifyRunsPayload>;
  moveArtifactSequence?: Maybe<MoveArtifactCollectionPayload>;
  moveProjects?: Maybe<MoveProjectsPayload>;
  moveRuns?: Maybe<MoveRunsPayload>;
  moveTag?: Maybe<CreateTagPayload>;
  moveTagCategory?: Maybe<UpdateTagCategoryPayload>;
  moveView?: Maybe<MoveViewPayload>;
  notifyScriptableRunAlert?: Maybe<NotifyScriptableRunAlertPayload>;
  popFromRunQueue?: Maybe<PopFromRunQueuePayload>;
  publishBenchmarkRun?: Maybe<PublishBenchmarkRunPayload>;
  purgeUser?: Maybe<PurgeUserPayload>;
  pushToRunQueue?: Maybe<PushToRunQueuePayload>;
  pushToRunQueueByName?: Maybe<PushToRunQueueByNamePayload>;
  removeProtectedAliases?: Maybe<RemoveProtectedAliasesPayload>;
  removeUserFromOrganization?: Maybe<RemoveUserFromOrganizationPayload>;
  renameProject?: Maybe<UpsertModelPayload>;
  resendEmailVerification?: Maybe<ResendEmailVerificationPayload>;
  resetPassword?: Maybe<ResetPasswordPayload>;
  revokeAccessToken?: Maybe<RevokeAccessTokenPayload>;
  revokeAccessTokenEmail?: Maybe<RevokeAccessTokenEmailPayload>;
  sendRequestOrgEmailDomainVerification?: Maybe<SendRequestOrgEmailDomainVerificationPayload>;
  setDismissedBanner?: Maybe<SetDismissedBannerPayload>;
  setTagColor?: Maybe<SetTagColorPayload>;
  starView?: Maybe<StarViewPayload>;
  startExperiment?: Maybe<UpdateExperimentPayload>;
  stopExperiment?: Maybe<UpdateExperimentPayload>;
  stopRun?: Maybe<StopRunPayload>;
  submitBenchmarkRun?: Maybe<SubmitBenchmarkRunPayload>;
  submitFCNews?: Maybe<SubmitFcNewsPayload>;
  testBucketStoreConnection: Array<BucketStoreConnectionError>;
  undeleteRuns?: Maybe<UndeleteRunsPayload>;
  undeleteUser?: Maybe<UndeleteUserPayload>;
  unlinkArtifact?: Maybe<UnlinkArtifactPayload>;
  unstarView?: Maybe<UnstarViewPayload>;
  updateAccessToken?: Maybe<UpdateAccessTokenPayload>;
  updateAccessTokenProjects?: Maybe<UpdateAccessTokenProjectsPayload>;
  updateArtifact?: Maybe<UpdateArtifactPayload>;
  updateArtifactManifest?: Maybe<UpdateArtifactManifestPayload>;
  updateArtifactPortfolio?: Maybe<UpdateArtifactCollectionPayload>;
  updateArtifactSequence?: Maybe<UpdateArtifactCollectionPayload>;
  updateArtifactType?: Maybe<UpdateArtifactTypePayload>;
  updateBenchmarkRun?: Maybe<UpdateBenchmarkRunPayload>;
  updateCustomChart?: Maybe<UpdateCustomChartPayload>;
  updateCustomerDefaultPaymentMethod?: Maybe<UpdateCustomerDefaultPaymentMethodPayload>;
  updateCustomerPaymentMethod?: Maybe<UpdateCustomerPaymentMethodPayload>;
  updateDefaultResourceConfig?: Maybe<UpdateDefaultResourceConfigPayload>;
  updateDiscussionComment?: Maybe<UpdateDiscussionCommentPayload>;
  updateDiscussionThread?: Maybe<UpdateDiscussionThreadPayload>;
  updateEntity?: Maybe<UpdateEntityPayload>;
  updateExperiment?: Maybe<UpdateExperimentPayload>;
  updateLaunchAgent?: Maybe<UpdateLaunchAgentPayload>;
  updateLocalLicense?: Maybe<UpdateLocalLicensePayload>;
  updateMember?: Maybe<UpdateMemberPayload>;
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  updateOrganizationBillingUser?: Maybe<UpdateOrganizationBillingUserPayload>;
  updateOrganizationSubscription?: Maybe<UpdateOrganizationSubscriptionPayload>;
  updateOrganizationUser?: Maybe<UpdateOrganizationUserPayload>;
  updateRampThreshold?: Maybe<UpdateRampThresholdPayload>;
  updateStoppedRunAlert?: Maybe<UpdateAlertPayload>;
  updateSubscription?: Maybe<UpdateSubscriptionPayload>;
  updateTag?: Maybe<CreateTagPayload>;
  updateTagCategory?: Maybe<UpdateTagCategoryPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  updateUserEmail?: Maybe<UpdateUserEmailPayload>;
  upgradeCustomerSubscription?: Maybe<UpgradeCustomerSubscriptionPayload>;
  /** @deprecated Use createPreviewableLink instead */
  uploadPanel?: Maybe<UploadPanelPayload>;
  upsertBucket?: Maybe<UpsertBucketPayload>;
  upsertModel?: Maybe<UpsertModelPayload>;
  upsertRunGroup?: Maybe<UpsertRunGroupPayload>;
  upsertSharedView?: Maybe<UpsertSharedViewPayload>;
  upsertSweep?: Maybe<UpsertSweepPayload>;
  upsertView?: Maybe<UpsertViewPayload>;
  useArtifact?: Maybe<UseArtifactPayload>;
  /** records a single view (page load) of a view (report) */
  viewView?: Maybe<ViewViewPayload>;
};

export type MutationAckRunQueueItemArgs = {
  input: AckRunQueueItemInput;
};

export type MutationAddAliasesArgs = {
  input: AddAliasesInput;
};

export type MutationAddFilesArgs = {
  input: AddFilesInput;
};

export type MutationAddProtectedAliasesArgs = {
  input: AddProtectedAliasesInput;
};

export type MutationAddUserToOrganizationArgs = {
  input: AddUserToOrganizationInput;
};

export type MutationAddWorkflowsAdminArgs = {
  input: AddWorkflowsAdminInput;
};

export type MutationAgentHeartbeatArgs = {
  input: AgentHeartbeatInput;
};

export type MutationAttachCustomerPaymentMethodArgs = {
  input: AttachCustomerPaymentMethodInput;
};

export type MutationCancelCustomerSubscriptionArgs = {
  input: CancelCustomerSubscriptionInput;
};

export type MutationClaimAnonymousEntityArgs = {
  input: ClaimAnonymousEntityInput;
};

export type MutationCloneProjectsArgs = {
  input: CloneProjectsInput;
};

export type MutationCommitArtifactArgs = {
  input: CommitArtifactInput;
};

export type MutationContactUsForComputeHoursArgs = {
  input: ContactUsForComputeHoursInput;
};

export type MutationContactUsForUserLedTrialArgs = {
  input: ContactUsForUserLedTrialInput;
};

export type MutationCopyFileArgs = {
  input: CopyFileInput;
};

export type MutationCreateAwsExternalIdArgs = {
  input: CreateAwsExternalIdInput;
};

export type MutationCreateAccessTokenArgs = {
  input: CreateAccessTokenInput;
};

export type MutationCreateAgentArgs = {
  input: CreateAgentInput;
};

export type MutationCreateAnonymousEntityArgs = {
  input: CreateAnonymousEntityInput;
};

export type MutationCreateArtifactArgs = {
  input: CreateArtifactInput;
};

export type MutationCreateArtifactCollectionTagAssignmentArgs = {
  input: CreateArtifactCollectionTagAssignmentInput;
};

export type MutationCreateArtifactFilesArgs = {
  input: CreateArtifactFilesInput;
};

export type MutationCreateArtifactManifestArgs = {
  input: CreateArtifactManifestInput;
};

export type MutationCreateArtifactPortfolioArgs = {
  input: CreateArtifactPortfolioInput;
};

export type MutationCreateArtifactSequenceArgs = {
  input: CreateArtifactSequenceInput;
};

export type MutationCreateArtifactTypeArgs = {
  input: CreateArtifactTypeInput;
};

export type MutationCreateBenchmarkDiscussionCommentArgs = {
  input: CreateBenchmarkDiscussionCommentInput;
};

export type MutationCreateBenchmarkDiscussionThreadArgs = {
  input: CreateBenchmarkDiscussionThreadInput;
};

export type MutationCreateClientIdMappingArgs = {
  input: CreateClientIdMappingInput;
};

export type MutationCreateCustomChartArgs = {
  input: CreateCustomChartInput;
};

export type MutationCreateCustomerSubscriptionArgs = {
  input: CreateCustomerSubscriptionInput;
};

export type MutationCreateCustomerTrialArgs = {
  input: CreateCustomerTrialInput;
};

export type MutationCreateDefaultResourceConfigArgs = {
  input: CreateDefaultResourceConfigInput;
};

export type MutationCreateEmailSubscriptionArgs = {
  input: CreateEmailSubscriptionInput;
};

export type MutationCreateEntityArgs = {
  input: CreateEntityInput;
};

export type MutationCreateExperimentArgs = {
  input: CreateExperimentInput;
};

export type MutationCreateFilterTriggerArgs = {
  input: CreateFilterTriggerInput;
};

export type MutationCreateFinishedRunAlertArgs = {
  input: CreateFinishedRunAlertInput;
};

export type MutationCreateGitHubOAuthIntegrationArgs = {
  input: CreateGitHubOAuthIntegrationInput;
};

export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};

export type MutationCreateLaunchAgentArgs = {
  input: CreateLaunchAgentInput;
};

export type MutationCreateLocalLicenseOrganizationArgs = {
  input: CreateLocalLicenseOrganizationInput;
};

export type MutationCreateNewsletterSubscriptionArgs = {
  input: CreateNewsletterSubscriptionInput;
};

export type MutationCreatePreviewableLinkArgs = {
  input: CreatePreviewableLinkInput;
};

export type MutationCreateRunQueueArgs = {
  input: CreateRunQueueInput;
};

export type MutationCreateScriptableRunAlertArgs = {
  input: CreateScriptableRunAlertInput;
};

export type MutationCreateServiceAccountArgs = {
  input: CreateServiceAccountInput;
};

export type MutationCreateSlackChannelSubscriptionArgs = {
  input: CreateSlackChannelSubscriptionInput;
};

export type MutationCreateSlackIntegrationArgs = {
  input: CreateSlackIntegrationInput;
};

export type MutationCreateStoppedRunAlertArgs = {
  input: CreateStoppedRunAlertInput;
};

export type MutationCreateStorageSubscriptionArgs = {
  input: CreateStorageSubscriptionInput;
};

export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationCreateUserLedTrialArgs = {
  input: CreateUserLedTrialInput;
};

export type MutationCreateViewCommentsAlertSubscriptionArgs = {
  input: CreateViewCommentsAlertSubscriptionInput;
};

export type MutationCreateViewDiscussionCommentArgs = {
  input: CreateViewDiscussionCommentInput;
};

export type MutationDeleteAlertArgs = {
  input: DeleteAlertInput;
};

export type MutationDeleteAlertSubscriptionArgs = {
  input: DeleteAlertSubscriptionInput;
};

export type MutationDeleteAliasesArgs = {
  input: DeleteAliasesInput;
};

export type MutationDeleteApiKeyArgs = {
  input: DeleteApiKeyInput;
};

export type MutationDeleteArtifactArgs = {
  input: DeleteArtifactInput;
};

export type MutationDeleteArtifactCollectionTagAssignmentArgs = {
  input: DeleteArtifactCollectionTagAssignmentInput;
};

export type MutationDeleteArtifactPortfolioArgs = {
  input: DeleteArtifactPortfolioInput;
};

export type MutationDeleteArtifactSequenceArgs = {
  input: DeleteArtifactSequenceInput;
};

export type MutationDeleteCustomChartArgs = {
  input: DeleteCustomChartInput;
};

export type MutationDeleteDefaultResourceConfigsArgs = {
  input: DeleteDefaultResourceConfigsInput;
};

export type MutationDeleteDiscussionCommentArgs = {
  input: DeleteDiscussionCommentInput;
};

export type MutationDeleteEntityArgs = {
  input: DeleteEntityInput;
};

export type MutationDeleteExperimentArgs = {
  input: DeleteExperimentInput;
};

export type MutationDeleteFilesArgs = {
  input: DeleteFilesInput;
};

export type MutationDeleteFromRunQueueArgs = {
  input: DeleteFromRunQueueInput;
};

export type MutationDeleteIntegrationArgs = {
  input: DeleteIntegrationInput;
};

export type MutationDeleteInviteArgs = {
  input: DeleteInviteInput;
};

export type MutationDeleteLaunchAgentsArgs = {
  input: DeleteLaunchAgentsInput;
};

export type MutationDeleteModelArgs = {
  input: DeleteModelInput;
};

export type MutationDeleteRunArgs = {
  input: DeleteRunInput;
};

export type MutationDeleteRunQueuesArgs = {
  input: DeleteRunQueuesInput;
};

export type MutationDeleteRunsArgs = {
  input: DeleteRunsInput;
};

export type MutationDeleteSweepArgs = {
  input: DeleteSweepInput;
};

export type MutationDeleteSweepsArgs = {
  input: DeleteSweepsInput;
};

export type MutationDeleteTeamArgs = {
  input: DeleteTeamInput;
};

export type MutationDeleteTriggerArgs = {
  input: DeleteTriggerInput;
};

export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};

export type MutationDeleteUserEmailArgs = {
  input: DeleteUserEmailInput;
};

export type MutationDeleteViewArgs = {
  input: DeleteViewInput;
};

export type MutationDeleteViewsArgs = {
  input: DeleteViewsInput;
};

export type MutationDeleteWorkflowsAdminArgs = {
  input: DeleteWorkflowsAdminInput;
};

export type MutationDetachCustomerPaymentMethodArgs = {
  input: DetachCustomerPaymentMethodInput;
};

export type MutationFailRunQueueItemArgs = {
  input: FailRunQueueItemInput;
};

export type MutationGenerateApiKeyArgs = {
  input: GenerateApiKeyInput;
};

export type MutationGenerateLocalLicenseArgs = {
  input: GenerateLocalLicenseInput;
};

export type MutationInsertGalleryDiscussionArgs = {
  input: InsertGalleryDiscussionInput;
};

export type MutationLinkArtifactArgs = {
  input: LinkArtifactInput;
};

export type MutationLinkTeamToOrganizationArgs = {
  input: LinkTeamToOrganizationInput;
};

export type MutationModifyRunsArgs = {
  input: ModifyRunsInput;
};

export type MutationMoveArtifactSequenceArgs = {
  input: MoveArtifactSequenceInput;
};

export type MutationMoveProjectsArgs = {
  input: MoveProjectsInput;
};

export type MutationMoveRunsArgs = {
  input: MoveRunsInput;
};

export type MutationMoveTagArgs = {
  input: MoveTagInput;
};

export type MutationMoveTagCategoryArgs = {
  input: MoveTagCategoryInput;
};

export type MutationMoveViewArgs = {
  input: MoveViewInput;
};

export type MutationNotifyScriptableRunAlertArgs = {
  input: NotifyScriptableRunAlertInput;
};

export type MutationPopFromRunQueueArgs = {
  input: PopFromRunQueueInput;
};

export type MutationPublishBenchmarkRunArgs = {
  input: PublishBenchmarkRunInput;
};

export type MutationPurgeUserArgs = {
  input: PurgeUserInput;
};

export type MutationPushToRunQueueArgs = {
  input: PushToRunQueueInput;
};

export type MutationPushToRunQueueByNameArgs = {
  input: PushToRunQueueByNameInput;
};

export type MutationRemoveProtectedAliasesArgs = {
  input: RemoveProtectedAliasesInput;
};

export type MutationRemoveUserFromOrganizationArgs = {
  input: RemoveUserFromOrganizationInput;
};

export type MutationRenameProjectArgs = {
  input: RenameProjectInput;
};

export type MutationResendEmailVerificationArgs = {
  input: ResendEmailVerificationInput;
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationRevokeAccessTokenArgs = {
  input: RevokeAccessTokenInput;
};

export type MutationRevokeAccessTokenEmailArgs = {
  input: RevokeAccessTokenEmailInput;
};

export type MutationSendRequestOrgEmailDomainVerificationArgs = {
  input: SendRequestOrgEmailDomainVerificationInput;
};

export type MutationSetDismissedBannerArgs = {
  input: SetDismissedBannerInput;
};

export type MutationSetTagColorArgs = {
  input: SetTagColorInput;
};

export type MutationStarViewArgs = {
  input: StarViewInput;
};

export type MutationStartExperimentArgs = {
  input: StartExperimentInput;
};

export type MutationStopExperimentArgs = {
  input: StopExperimentInput;
};

export type MutationStopRunArgs = {
  input: StopRunInput;
};

export type MutationSubmitBenchmarkRunArgs = {
  input: SubmitBenchmarkRunInput;
};

export type MutationSubmitFcNewsArgs = {
  input: SubmitFcNewsInput;
};

export type MutationTestBucketStoreConnectionArgs = {
  input: StorageBucketInfoInput;
};

export type MutationUndeleteRunsArgs = {
  input: UndeleteRunsInput;
};

export type MutationUndeleteUserArgs = {
  input: UndeleteUserInput;
};

export type MutationUnlinkArtifactArgs = {
  input: UnlinkArtifactInput;
};

export type MutationUnstarViewArgs = {
  input: UnstarViewInput;
};

export type MutationUpdateAccessTokenArgs = {
  input: UpdateAccessTokenInput;
};

export type MutationUpdateAccessTokenProjectsArgs = {
  input: UpdateAccessTokenProjectsInput;
};

export type MutationUpdateArtifactArgs = {
  input: UpdateArtifactInput;
};

export type MutationUpdateArtifactManifestArgs = {
  input: UpdateArtifactManifestInput;
};

export type MutationUpdateArtifactPortfolioArgs = {
  input: UpdateArtifactPortfolioInput;
};

export type MutationUpdateArtifactSequenceArgs = {
  input: UpdateArtifactSequenceInput;
};

export type MutationUpdateArtifactTypeArgs = {
  input: UpdateArtifactTypeInput;
};

export type MutationUpdateBenchmarkRunArgs = {
  input: UpdateBenchmarkRunInput;
};

export type MutationUpdateCustomChartArgs = {
  input: UpdateCustomChartInput;
};

export type MutationUpdateCustomerDefaultPaymentMethodArgs = {
  input: UpdateCustomerDefaultPaymentMethodInput;
};

export type MutationUpdateCustomerPaymentMethodArgs = {
  input: UpdateCustomerPaymentMethodInput;
};

export type MutationUpdateDefaultResourceConfigArgs = {
  input: UpdateDefaultResourceConfigInput;
};

export type MutationUpdateDiscussionCommentArgs = {
  input: UpdateDiscussionCommentInput;
};

export type MutationUpdateDiscussionThreadArgs = {
  input: UpdateDiscussionThreadInput;
};

export type MutationUpdateEntityArgs = {
  input: UpdateEntityInput;
};

export type MutationUpdateExperimentArgs = {
  input: UpdateExperimentInput;
};

export type MutationUpdateLaunchAgentArgs = {
  input: UpdateLaunchAgentInput;
};

export type MutationUpdateLocalLicenseArgs = {
  input: UpdateLocalLicenseInput;
};

export type MutationUpdateMemberArgs = {
  input: UpdateMemberInput;
};

export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};

export type MutationUpdateOrganizationBillingUserArgs = {
  input: UpdateOrganizationBillingUserInput;
};

export type MutationUpdateOrganizationSubscriptionArgs = {
  input: UpdateOrganizationSubscriptionInput;
};

export type MutationUpdateOrganizationUserArgs = {
  input: UpdateOrganizationUserInput;
};

export type MutationUpdateRampThresholdArgs = {
  input: UpdateRampThresholdInput;
};

export type MutationUpdateStoppedRunAlertArgs = {
  input: UpdateStoppedRunAlertInput;
};

export type MutationUpdateSubscriptionArgs = {
  input: UpdateSubscriptionInput;
};

export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};

export type MutationUpdateTagCategoryArgs = {
  input: UpdateTagCategoryInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationUpdateUserEmailArgs = {
  input: UpdateUserEmailInput;
};

export type MutationUpgradeCustomerSubscriptionArgs = {
  input: UpgradeCustomerSubscriptionInput;
};

export type MutationUploadPanelArgs = {
  input: UploadPanelInput;
};

export type MutationUpsertBucketArgs = {
  input: UpsertBucketInput;
};

export type MutationUpsertModelArgs = {
  input: UpsertModelInput;
};

export type MutationUpsertRunGroupArgs = {
  input: UpsertRunGroupInput;
};

export type MutationUpsertSharedViewArgs = {
  input: UpsertSharedViewInput;
};

export type MutationUpsertSweepArgs = {
  input: UpsertSweepInput;
};

export type MutationUpsertViewArgs = {
  input: UpsertViewInput;
};

export type MutationUseArtifactArgs = {
  input: UseArtifactInput;
};

export type MutationViewViewArgs = {
  input: ViewViewInput;
};

export type NewsletterSubscription = {
  __typename?: 'NewsletterSubscription';
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  user?: Maybe<User>;
};

export type NewsletterSubscriptionConnection = {
  __typename?: 'NewsletterSubscriptionConnection';
  edges: Array<NewsletterSubscriptionEdge>;
};

export type NewsletterSubscriptionEdge = {
  __typename?: 'NewsletterSubscriptionEdge';
  cursor: Scalars['String'];
  node?: Maybe<NewsletterSubscription>;
};

export type Node = {
  id: Scalars['ID'];
};

export type NotificationActionInput = {
  integrationID: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
  severity?: InputMaybe<AlertSeverity>;
  title?: InputMaybe<Scalars['String']>;
};

export type NotificationTriggeredAction = {
  __typename?: 'NotificationTriggeredAction';
  integration: Integration;
  message?: Maybe<Scalars['String']>;
  severity?: Maybe<AlertSeverity>;
  title?: Maybe<Scalars['String']>;
};

export type NotifyScriptableRunAlertInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  projectName: Scalars['String'];
  runName: Scalars['String'];
  severity?: InputMaybe<AlertSeverity>;
  text: Scalars['String'];
  title: Scalars['String'];
  waitDuration?: InputMaybe<Scalars['Duration']>;
};

export type NotifyScriptableRunAlertPayload = {
  __typename?: 'NotifyScriptableRunAlertPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export enum ObservationalUnit {
  AnonymousUser = 'ANONYMOUS_USER',
  Organization = 'ORGANIZATION',
  Team = 'TEAM',
  User = 'USER',
}

export enum OrderDir {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum OrgType {
  Organization = 'ORGANIZATION',
  Personal = 'PERSONAL',
}

export type Organization = Node & {
  __typename?: 'Organization';
  /** legacy: prefer artifactCollections */
  artifactCollections?: Maybe<ArtifactCollectionConnection>;
  artifactSequences?: Maybe<ArtifactSequenceConnection>;
  available: Scalars['Boolean'];
  billingUser?: Maybe<User>;
  flags?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  members: Array<OrganizationMember>;
  name: Scalars['String'];
  orgType: OrgType;
  pendingInvites: Array<Invite>;
  projects?: Maybe<ProjectConnection>;
  seatAvailability: OrganizationSeatAvailability;
  stripeBillingInfo?: Maybe<StripeBillingInfo>;
  stripeInvoices: Array<StripeInvoice>;
  stripePaymentMethods: Array<StripePaymentMethod>;
  subscriptions: Array<OrganizationSubscription>;
  teams: Array<Entity>;
  usedSeats: Scalars['Int'];
  usedViewOnlySeats: Scalars['Int'];
  views: ViewConnection;
};

export type OrganizationArtifactCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  collectionTypes?: InputMaybe<Array<ArtifactCollectionType>>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type OrganizationArtifactSequencesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type OrganizationProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type OrganizationViewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  edges: Array<OrganizationEdge>;
  pageInfo: PageInfo;
};

export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  cursor: Scalars['String'];
  node: Organization;
};

export type OrganizationMember = {
  __typename?: 'OrganizationMember';
  admin: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
  photoUrl: Scalars['String'];
  role: Scalars['String'];
  teams?: Maybe<EntityConnection>;
  user: User;
  /** pending: Boolean -- TODO will need this soon. */
  username: Scalars['String'];
};

export type OrganizationMemberTeamsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type OrganizationSeatAvailability = {
  __typename?: 'OrganizationSeatAvailability';
  seats: Scalars['Int'];
  viewOnlySeats: Scalars['Int'];
};

export type OrganizationSubscription = {
  __typename?: 'OrganizationSubscription';
  availableSeatsToPurchase: Scalars['Int'];
  expiresAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isAutomaticUpgrade: Scalars['Boolean'];
  nextPlans: Array<Plan>;
  plan: Plan;
  privileges: Scalars['JSON'];
  seats: Scalars['Int'];
  status: OrganizationSubscriptionStatus;
  subscriptionType: OrganizationSubscriptionType;
  thresholdCrossedAt?: Maybe<Scalars['DateTime']>;
  upgradedAt?: Maybe<Scalars['DateTime']>;
};

export enum OrganizationSubscriptionStatus {
  Disabled = 'DISABLED',
  Enabled = 'ENABLED',
}

export enum OrganizationSubscriptionType {
  Academic = 'ACADEMIC',
  AcademicTrial = 'ACADEMIC_TRIAL',
  Enterprise = 'ENTERPRISE',
  Local = 'LOCAL',
  ManualTrial = 'MANUAL_TRIAL',
  Stripe = 'STRIPE',
  UserLedTrial = 'USER_LED_TRIAL',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  cardType?: Maybe<Scalars['String']>;
  endingIn?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  type: Scalars['String'];
};

export type Plan = {
  __typename?: 'Plan';
  billingInterval?: Maybe<Scalars['String']>;
  defaultPrivileges: Scalars['JSON'];
  displayName: Scalars['String'];
  id: Scalars['ID'];
  maxSeats: Scalars['Int'];
  name: Scalars['String'];
  planType: PlanType;
  planVisibility: PlanVisibility;
  stripePlanId?: Maybe<Scalars['String']>;
  stripePrice?: Maybe<StripePrice>;
  unitPrice?: Maybe<Scalars['Int']>;
};

export enum PlanType {
  Primary = 'PRIMARY',
  Reference = 'REFERENCE',
  Storage = 'STORAGE',
}

export enum PlanVisibility {
  Deprecated = 'DEPRECATED',
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type PopFromRunQueueInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  launchAgentId?: InputMaybe<Scalars['ID']>;
  projectName: Scalars['String'];
  queueName: Scalars['String'];
};

export type PopFromRunQueuePayload = {
  __typename?: 'PopFromRunQueuePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  runQueueItemId?: Maybe<Scalars['ID']>;
  runSpec?: Maybe<Scalars['JSON']>;
};

export type PreviewFriendlyUrl = {
  __typename?: 'PreviewFriendlyURL';
  URL: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  viewID: Scalars['ID'];
};

export type PreviewableLink = {
  __typename?: 'PreviewableLink';
  URL: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  resourceID: Scalars['ID'];
  resourceType: PreviewableLinkResourceType;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum PreviewableLinkResourceType {
  Entity = 'Entity',
  User = 'User',
  View = 'View',
}

export type Project = Node & {
  __typename?: 'Project';
  access?: Maybe<Scalars['String']>;
  allViews?: Maybe<ViewConnection>;
  artifact?: Maybe<Artifact>;
  artifactCollection?: Maybe<ArtifactCollection>;
  artifactCollections?: Maybe<ArtifactCollectionConnection>;
  artifactType?: Maybe<ArtifactType>;
  artifactTypes: ArtifactTypeConnection;
  benchmarkDiscussionThreads: DiscussionThreadConnection;
  benchmarkRuns?: Maybe<BenchmarkRunConnection>;
  benchmarkSubmissions?: Maybe<BenchmarkRunConnection>;
  bucket?: Maybe<Run>;
  bucketCount?: Maybe<Scalars['Int']>;
  buckets?: Maybe<RunConnection>;
  computeHours: Scalars['Duration'];
  createdAt: Scalars['DateTime'];
  defaultResourceConfigs?: Maybe<DefaultResourceConfigConnection>;
  description?: Maybe<Scalars['String']>;
  dockerImage?: Maybe<Scalars['String']>;
  entity: Entity;
  /** deprecated */
  entityId?: Maybe<Scalars['Int']>;
  entityName: Scalars['String'];
  featured?: Maybe<Scalars['Int']>;
  fields: ProjectFieldConnection;
  gitHubSubmissionRepo?: Maybe<Scalars['String']>;
  groupPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isBenchmark: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  lastActive?: Maybe<Scalars['DateTime']>;
  launchAgents: Array<LaunchAgent>;
  linkedBenchmark?: Maybe<Project>;
  media?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  ndbId?: Maybe<Scalars['ID']>;
  parameterImportance: Scalars['JSON'];
  pathCounts?: Maybe<Scalars['JSONString']>;
  public?: Maybe<Scalars['Boolean']>;
  readOnly?: Maybe<Scalars['Boolean']>;
  repo?: Maybe<Scalars['String']>;
  requestSubscribe?: Maybe<Scalars['Boolean']>;
  run?: Maybe<Run>;
  runActiveCount: Scalars['Int'];
  runCount: Scalars['Int'];
  runGroup?: Maybe<RunGroup>;
  /** deprecated */
  runKeySuggestions: Array<RunKeySuggestion>;
  runOutputArtifactsCount: Scalars['Int'];
  runQueue?: Maybe<RunQueue>;
  runQueues: Array<RunQueue>;
  runTable?: Maybe<RunTable>;
  runs?: Maybe<RunConnection>;
  storageBytes: Scalars['Int64'];
  subGroupPath?: Maybe<Scalars['String']>;
  summaryMetrics?: Maybe<Scalars['JSONString']>;
  sweep?: Maybe<Sweep>;
  sweeps?: Maybe<SweepConnection>;
  tagCounts: Array<RunTagCount>;
  tags: Array<RunTag>;
  totalRunTime?: Maybe<Scalars['Float']>;
  totalRuns?: Maybe<Scalars['Int']>;
  totalRunsWithGroup: Scalars['Int'];
  totalRunsWithJobType: Scalars['Int'];
  totalSweeps: Scalars['Int'];
  totalUsers?: Maybe<Scalars['Int']>;
  triggers: Array<Trigger>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** groups(fields: [String], level: String, filters: JSONString, order: String, historyFields: [String], before: String, after: String, first: Int, last: Int): GroupConnection */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
  valueCounts?: Maybe<Scalars['JSONString']>;
  views?: Maybe<Scalars['JSONString']>;
};

export type ProjectAllViewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
  userName?: InputMaybe<Scalars['String']>;
  viewName?: InputMaybe<Scalars['String']>;
  viewType?: InputMaybe<Scalars['String']>;
};

export type ProjectArtifactArgs = {
  name: Scalars['String'];
};

export type ProjectArtifactCollectionArgs = {
  name: Scalars['String'];
};

export type ProjectArtifactCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  collectionTypes?: InputMaybe<Array<ArtifactCollectionType>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ProjectArtifactTypeArgs = {
  name: Scalars['String'];
};

export type ProjectArtifactTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ProjectBenchmarkDiscussionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ProjectBenchmarkRunsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  state: Scalars['String'];
};

export type ProjectBenchmarkSubmissionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ProjectBucketArgs = {
  desc?: InputMaybe<Scalars['String']>;
  missingOk?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type ProjectBucketsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  jobKey?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order?: InputMaybe<Scalars['String']>;
};

export type ProjectDefaultResourceConfigsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ProjectFieldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  columns?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type ProjectParameterImportanceArgs = {
  filters?: InputMaybe<Scalars['JSONString']>;
  limit?: InputMaybe<Scalars['Int']>;
  parameters?: InputMaybe<Array<Scalars['String']>>;
  runParameters?: InputMaybe<Array<Scalars['String']>>;
  target: Scalars['String'];
};

export type ProjectPathCountsArgs = {
  filters?: InputMaybe<Scalars['JSONString']>;
};

export type ProjectRunArgs = {
  desc?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ProjectRunActiveCountArgs = {
  filters?: InputMaybe<Scalars['JSONString']>;
};

export type ProjectRunCountArgs = {
  filters?: InputMaybe<Scalars['JSONString']>;
};

export type ProjectRunGroupArgs = {
  name: Scalars['String'];
};

export type ProjectRunKeySuggestionsArgs = {
  filters?: InputMaybe<Scalars['JSONString']>;
  keyPath: Scalars['String'];
};

export type ProjectRunOutputArtifactsCountArgs = {
  filters?: InputMaybe<Scalars['JSONString']>;
};

export type ProjectRunQueueArgs = {
  name: Scalars['String'];
};

export type ProjectRunsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  groupAggregation?: InputMaybe<GroupAggregation>;
  groupKeys?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  groupLevel?: InputMaybe<Scalars['Int']>;
  historyFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  jobKey?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order?: InputMaybe<Scalars['String']>;
};

export type ProjectSweepArgs = {
  sweepName: Scalars['String'];
};

export type ProjectSweepsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type ProjectTagCountsArgs = {
  filters?: InputMaybe<Scalars['JSONString']>;
};

export type ProjectValueCountsArgs = {
  filters?: InputMaybe<Scalars['JSONString']>;
  keyPath?: InputMaybe<Scalars['String']>;
};

export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  edges: Array<ProjectEdge>;
  pageInfo: PageInfo;
};

export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  cursor: Scalars['String'];
  node?: Maybe<Project>;
};

export type ProjectField = {
  __typename?: 'ProjectField';
  path: Scalars['String'];
  type: Scalars['String'];
};

export type ProjectFieldConnection = {
  __typename?: 'ProjectFieldConnection';
  edges: Array<ProjectFieldEdge>;
  pageInfo: PageInfo;
};

export type ProjectFieldEdge = {
  __typename?: 'ProjectFieldEdge';
  cursor: Scalars['String'];
  node: ProjectField;
};

export type ProjectIdentifierInput = {
  EntityName?: InputMaybe<Scalars['String']>;
  Name?: InputMaybe<Scalars['String']>;
};

export type ProjectSpecifier = {
  entityName: Scalars['String'];
  projectName: Scalars['String'];
};

export type ProjectStorageNode = StorageTreeNode & {
  __typename?: 'ProjectStorageNode';
  artifactSequences: ArtifactSequenceStorageNodeConnection;
  artifactTypes: Array<ArtifactTypeStorageNode>;
  id: Scalars['ID'];
  name: Scalars['String'];
  project: Project;
  projectID: Scalars['ID'];
  runs: RunStorageNodeConnection;
  size: Scalars['Int64'];
};

export type ProjectStorageNodeArtifactSequencesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ProjectStorageNodeArtifactTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ProjectStorageNodeRunsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ProjectStorageNodeConnection = {
  __typename?: 'ProjectStorageNodeConnection';
  edges: Array<ProjectStorageNodeEdge>;
  pageInfo: PageInfo;
  totalSize: Scalars['Int64'];
};

export type ProjectStorageNodeEdge = {
  __typename?: 'ProjectStorageNodeEdge';
  cursor: Scalars['String'];
  node: ProjectStorageNode;
};

export type PublicImageUploadInfo = {
  __typename?: 'PublicImageUploadInfo';
  imageUrl: Scalars['String'];
  uploadHeaders: Array<Scalars['String']>;
  uploadUrl: Scalars['String'];
};

export type PublishBenchmarkRunInput = {
  benchmarkEntityName?: InputMaybe<Scalars['String']>;
  benchmarkName?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isCodeHidden?: InputMaybe<Scalars['Boolean']>;
};

export type PublishBenchmarkRunPayload = {
  __typename?: 'PublishBenchmarkRunPayload';
  benchmarkRun: BenchmarkRun;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type PurgeUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  username: Scalars['String'];
};

export type PurgeUserPayload = {
  __typename?: 'PurgeUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type PushToRunQueueByNameInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  projectName: Scalars['String'];
  queueName: Scalars['String'];
  runSpec: Scalars['JSONString'];
};

export type PushToRunQueueByNamePayload = {
  __typename?: 'PushToRunQueueByNamePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  runQueueItemId: Scalars['ID'];
  runSpec: Scalars['JSONString'];
};

export type PushToRunQueueInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  queueID: Scalars['ID'];
  runSpec: Scalars['JSONString'];
};

export type PushToRunQueuePayload = {
  __typename?: 'PushToRunQueuePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  runQueueItemId: Scalars['ID'];
  runSpec: Scalars['JSONString'];
};

export type Query = {
  __typename?: 'Query';
  activeExperiments: Array<ActiveExperiment>;
  artifact?: Maybe<Artifact>;
  artifactCollection?: Maybe<ArtifactCollection>;
  artifactSequence?: Maybe<ArtifactSequence>;
  benchmarks?: Maybe<ProjectConnection>;
  clientIDMapping?: Maybe<ClientIdMapping>;
  customChart?: Maybe<CustomChart>;
  customCharts?: Maybe<CustomChartConnection>;
  dataFrame?: Maybe<RowConnection>;
  dataFrameSchema: Array<Scalars['JSON']>;
  discussionComment?: Maybe<DiscussionComment>;
  discussionThread?: Maybe<DiscussionThread>;
  dismissedBanner?: Maybe<DismissedBanner>;
  entities?: Maybe<EntityConnection>;
  entity?: Maybe<Entity>;
  events?: Maybe<EventConnection>;
  experiments: Array<Experiment>;
  featuredReports?: Maybe<View>;
  galleryTagSections: Scalars['JSONString'];
  highQualityUserProfiles?: Maybe<View>;
  instance?: Maybe<WbInstance>;
  invite?: Maybe<Invite>;
  launchAgent?: Maybe<LaunchAgent>;
  localLicenses: Array<Maybe<LocalLicense>>;
  model?: Maybe<Project>;
  models?: Maybe<ProjectConnection>;
  newsletterSubscriptions?: Maybe<NewsletterSubscriptionConnection>;
  numPendingInvites: Scalars['Int'];
  organization?: Maybe<Organization>;
  organizations: OrganizationConnection;
  plans: Array<Maybe<Plan>>;
  /** @deprecated Use previewableLink instead */
  previewFriendlyURL?: Maybe<PreviewFriendlyUrl>;
  previewableLink?: Maybe<PreviewableLink>;
  project?: Maybe<Project>;
  projects?: Maybe<ProjectConnection>;
  publicImageUploadUrl?: Maybe<PublicImageUploadInfo>;
  publicViews?: Maybe<ViewConnection>;
  publishedProjects?: Maybe<ProjectConnection>;
  rampManager?: Maybe<RampManager>;
  repo?: Maybe<Repo>;
  repoInsightsPlotData?: Maybe<RepoInsightsRowConnection>;
  reportSearch?: Maybe<ViewConnection>;
  serverInfo?: Maybe<ServerInfo>;
  singletonView?: Maybe<View>;
  task?: Maybe<Task>;
  trendingRepos?: Maybe<RowConnection>;
  user?: Maybe<User>;
  users?: Maybe<UserConnection>;
  view?: Maybe<View>;
  viewer?: Maybe<User>;
  views?: Maybe<ViewConnection>;
};

export type QueryArtifactArgs = {
  id: Scalars['ID'];
};

export type QueryArtifactCollectionArgs = {
  id: Scalars['ID'];
};

export type QueryArtifactSequenceArgs = {
  id: Scalars['ID'];
};

export type QueryBenchmarksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type QueryClientIdMappingArgs = {
  clientID: Scalars['ID'];
};

export type QueryCustomChartArgs = {
  id: Scalars['ID'];
};

export type QueryCustomChartsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  entity?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  type: Scalars['String'];
  userName?: InputMaybe<Scalars['String']>;
};

export type QueryDataFrameArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  columns?: InputMaybe<Array<Scalars['String']>>;
  dataFrameKeys: Array<Scalars['String']>;
  entityName: Scalars['String'];
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  groupKeys?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  projectName: Scalars['String'];
};

export type QueryDataFrameSchemaArgs = {
  dataFrameKeys: Array<Scalars['String']>;
  entityName: Scalars['String'];
  projectName: Scalars['String'];
};

export type QueryDiscussionCommentArgs = {
  id: Scalars['ID'];
};

export type QueryDiscussionThreadArgs = {
  id: Scalars['ID'];
};

export type QueryDismissedBannerArgs = {
  id: Scalars['ID'];
};

export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type QueryEntityArgs = {
  login?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QueryEventsArgs = {
  admin?: InputMaybe<Scalars['Boolean']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryInviteArgs = {
  key: Scalars['String'];
};

export type QueryLaunchAgentArgs = {
  id: Scalars['ID'];
};

export type QueryLocalLicensesArgs = {
  expired?: InputMaybe<Scalars['Boolean']>;
};

export type QueryModelArgs = {
  entityName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QueryModelsArgs = {
  after?: InputMaybe<Scalars['String']>;
  batchSize?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keysOnly?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type QueryNewsletterSubscriptionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type QueryOrganizationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QueryOrganizationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  emailDomain?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};

export type QueryPreviewFriendlyUrlArgs = {
  viewID: Scalars['ID'];
};

export type QueryPreviewableLinkArgs = {
  resourceID: Scalars['ID'];
  resourceType: PreviewableLinkResourceType;
};

export type QueryProjectArgs = {
  entityName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  anonymous?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type QueryPublicViewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type QueryPublishedProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type QueryRepoArgs = {
  id: Scalars['ID'];
};

export type QueryRepoInsightsPlotDataArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  columns?: InputMaybe<Array<Scalars['String']>>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  groupKeys?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  plotName: Scalars['String'];
  repoName: Scalars['String'];
};

export type QueryReportSearchArgs = {
  query: Scalars['String'];
};

export type QuerySingletonViewArgs = {
  type: Scalars['String'];
};

export type QueryTaskArgs = {
  id: Scalars['ID'];
};

export type QueryTrendingReposArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Scalars['DateTime']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  usernames?: InputMaybe<Array<Scalars['String']>>;
};

export type QueryViewArgs = {
  id: Scalars['ID'];
  type?: InputMaybe<Scalars['String']>;
};

export type QueryViewerArgs = {
  entityName?: InputMaybe<Scalars['String']>;
};

export type QueryViewsArgs = {
  ids: Array<Scalars['ID']>;
};

export type QueueJobActionInput = {
  queueID: Scalars['ID'];
  template: Scalars['JSONString'];
};

/** | WebhookTriggeredAction */
export type QueueJobTriggeredAction = {
  __typename?: 'QueueJobTriggeredAction';
  queue: RunQueue;
  template: Scalars['JSONString'];
};

export type RampManager = {
  __typename?: 'RampManager';
  settings: RampSettingConnection;
};

export type RampSettingConnection = {
  __typename?: 'RampSettingConnection';
  edges: Array<RampSettingEdge>;
};

export type RampSettingEdge = {
  __typename?: 'RampSettingEdge';
  description: Scalars['String'];
  group: Scalars['String'];
  name: Scalars['String'];
  stores: Array<RampThresholdStore>;
};

export type RampSettingThreshold = {
  __typename?: 'RampSettingThreshold';
  checkId: Scalars['String'];
  threshold: Scalars['Float'];
};

export type RampThresholdStore = {
  __typename?: 'RampThresholdStore';
  name: Scalars['String'];
  thresholds: Array<RampSettingThreshold>;
};

export type RateLimits = {
  __typename?: 'RateLimits';
  filestream: Scalars['Int'];
  graphql: Scalars['Int'];
};

export type RateLimitsInput = {
  filestream?: InputMaybe<Scalars['Int']>;
  graphql?: InputMaybe<Scalars['Int']>;
};

export type RemoveProtectedAliasesInput = {
  adminType: WorkflowsAdminType;
  aliases: Array<Scalars['String']>;
  clientMutationID?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
};

export type RemoveProtectedAliasesPayload = {
  __typename?: 'RemoveProtectedAliasesPayload';
  aliases: Array<Scalars['String']>;
};

export type RemoveUserFromOrganizationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  userName: Scalars['String'];
};

export type RemoveUserFromOrganizationPayload = {
  __typename?: 'RemoveUserFromOrganizationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type RenameProjectInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  newProjectName: Scalars['String'];
  oldProjectName: Scalars['String'];
};

export type Repo = Node & {
  __typename?: 'Repo';
  displayName: Scalars['String'];
  entity: Entity;
  id: Scalars['ID'];
};

export type RepoConnection = {
  __typename?: 'RepoConnection';
  edges: Array<RepoEdge>;
};

export type RepoEdge = {
  __typename?: 'RepoEdge';
  cursor: Scalars['String'];
  node?: Maybe<Repo>;
};

export type RepoInsightsRowConnection = {
  __typename?: 'RepoInsightsRowConnection';
  edges: Array<RowEdge>;
  isNormalizedUserCount: Scalars['Boolean'];
  pageInfo: PageInfo;
  schema: Scalars['JSON'];
  totalCount: Scalars['Int'];
};

export type ResendEmailVerificationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type ResendEmailVerificationPayload = {
  __typename?: 'ResendEmailVerificationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ResetPasswordInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  success: Scalars['Boolean'];
};

export type RevokeAccessTokenEmailInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  token: Scalars['String'];
};

export type RevokeAccessTokenEmailPayload = {
  __typename?: 'RevokeAccessTokenEmailPayload';
  accessToken: AccessToken;
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type RevokeAccessTokenInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type RevokeAccessTokenPayload = {
  __typename?: 'RevokeAccessTokenPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type RowConnection = {
  __typename?: 'RowConnection';
  edges: Array<RowEdge>;
  pageInfo: PageInfo;
  schema: Scalars['JSON'];
  totalCount: Scalars['Int'];
};

export type RowEdge = {
  __typename?: 'RowEdge';
  node?: Maybe<RowType>;
};

export type RowType = {
  __typename?: 'RowType';
  row: Scalars['JSON'];
};

export type Run = BucketType &
  Node & {
    __typename?: 'Run';
    agent?: Maybe<Agent>;
    benchmarkRun?: Maybe<BenchmarkRun>;
    commit?: Maybe<Scalars['String']>;
    computeSeconds: Scalars['Duration'];
    config?: Maybe<Scalars['JSONString']>;
    createdAt: Scalars['DateTime'];
    debug?: Maybe<Scalars['Boolean']>;
    defaultColorIndex?: Maybe<Scalars['Int']>;
    deletedAt?: Maybe<Scalars['DateTime']>;
    description?: Maybe<Scalars['String']>;
    displayName?: Maybe<Scalars['String']>;
    events: Array<Scalars['String']>;
    eventsLineCount?: Maybe<Scalars['Int']>;
    eventsTail?: Maybe<Scalars['JSONString']>;
    exampleTable?: Maybe<Scalars['JSONString']>;
    exampleTableColumns?: Maybe<Scalars['JSONString']>;
    exampleTableTypes?: Maybe<Scalars['JSONString']>;
    exitcode?: Maybe<Scalars['Float']>;
    failed?: Maybe<Scalars['Boolean']>;
    fileCount?: Maybe<Scalars['Int']>;
    files?: Maybe<FileConnection>;
    framework?: Maybe<Scalars['String']>;
    github?: Maybe<Scalars['String']>;
    group?: Maybe<Scalars['String']>;
    groupCounts?: Maybe<Array<Scalars['Int']>>;
    heartbeatAt?: Maybe<Scalars['DateTime']>;
    history: Array<Scalars['String']>;
    historyKeys?: Maybe<Scalars['JSON']>;
    historyLineCount?: Maybe<Scalars['Int']>;
    historyTail?: Maybe<Scalars['JSONString']>;
    host?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    inputArtifacts?: Maybe<InputArtifactConnection>;
    jobId?: Maybe<Scalars['Int']>;
    jobType?: Maybe<Scalars['String']>;
    logLineCount?: Maybe<Scalars['Int']>;
    logLines?: Maybe<LogLineConnection>;
    model?: Maybe<Project>;
    name: Scalars['String'];
    ndbId?: Maybe<Scalars['ID']>;
    notes?: Maybe<Scalars['String']>;
    outputArtifacts?: Maybe<ArtifactConnection>;
    patch?: Maybe<Scalars['String']>;
    pendingUpdates: Scalars['Boolean'];
    project?: Maybe<Project>;
    projectId: Scalars['ID'];
    readOnly?: Maybe<Scalars['Boolean']>;
    requestSubscribe?: Maybe<Scalars['Boolean']>;
    runInfo?: Maybe<RunInfo>;
    running?: Maybe<Scalars['Boolean']>;
    sampledHistory: Array<Scalars['JSON']>;
    servicesAvailable?: Maybe<RunServicesAvailable>;
    shouldStop?: Maybe<Scalars['Boolean']>;
    state?: Maybe<Scalars['String']>;
    stopped?: Maybe<Scalars['Boolean']>;
    storageBytes: Scalars['Int64'];
    summaryMetrics?: Maybe<Scalars['JSONString']>;
    sweep?: Maybe<Sweep>;
    sweepName?: Maybe<Scalars['String']>;
    systemMetrics?: Maybe<Scalars['JSONString']>;
    tagColors: Array<RunTag>;
    tags?: Maybe<Array<Scalars['String']>>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    user?: Maybe<User>;
    userId?: Maybe<Scalars['Int']>;
    wandbConfig?: Maybe<Scalars['JSONString']>;
  };

export type RunConfigArgs = {
  dotBehavior?: InputMaybe<DotBehavior>;
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export type RunEventsArgs = {
  samples?: InputMaybe<Scalars['Int']>;
};

export type RunFilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pattern?: InputMaybe<Scalars['String']>;
};

export type RunHistoryArgs = {
  maxStep?: InputMaybe<Scalars['Int64']>;
  minStep?: InputMaybe<Scalars['Int64']>;
  samples?: InputMaybe<Scalars['Int']>;
};

export type RunHistoryKeysArgs = {
  format?: InputMaybe<HistoryKeysFormat>;
};

export type RunInputArtifactsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type RunLogLinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RunOutputArtifactsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type RunSampledHistoryArgs = {
  packVersion?: InputMaybe<Scalars['Int']>;
  specs: Array<Scalars['JSONString']>;
};

export type RunSummaryMetricsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
  packVersion?: InputMaybe<Scalars['Int']>;
};

export type RunWandbConfigArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export type RunConnection = {
  __typename?: 'RunConnection';
  delta: Array<RunDiff>;
  edges: Array<RunEdge>;
  historyKeys?: Maybe<Scalars['JSON']>;
  pageInfo: PageInfo;
  paths?: Maybe<Scalars['JSONString']>;
  totalCount: Scalars['Int'];
  totalCountApprox: IntRange;
};

export type RunConnectionDeltaArgs = {
  currentRuns: Array<Scalars['String']>;
  lastUpdated: Scalars['DateTime'];
};

export type RunConnectionHistoryKeysArgs = {
  format?: InputMaybe<HistoryKeysFormat>;
};

export type RunDiff = {
  __typename?: 'RunDiff';
  index: Scalars['Int'];
  op: DiffOperation;
  run?: Maybe<Run>;
};

export type RunEdge = {
  __typename?: 'RunEdge';
  cursor: Scalars['String'];
  node: Run;
};

export type RunGroup = {
  __typename?: 'RunGroup';
  id: Scalars['ID'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  project: Project;
  tags: Array<RunTag>;
};

export type RunInfo = {
  __typename?: 'RunInfo';
  args: Array<Scalars['String']>;
  codeSaved?: Maybe<Scalars['Boolean']>;
  colab?: Maybe<Scalars['String']>;
  cpuCount?: Maybe<Scalars['Int']>;
  executable?: Maybe<Scalars['String']>;
  git?: Maybe<GitInfo>;
  gpu?: Maybe<Scalars['String']>;
  gpuCount?: Maybe<Scalars['Int']>;
  os?: Maybe<Scalars['String']>;
  program?: Maybe<Scalars['String']>;
  python?: Maybe<Scalars['String']>;
};

export type RunKeySuggestion = {
  __typename?: 'RunKeySuggestion';
  count: Scalars['Int'];
  displayValue?: Maybe<Scalars['JSONString']>;
  value?: Maybe<Scalars['JSONString']>;
};

export type RunQueue = {
  __typename?: 'RunQueue';
  access: RunQueueAccessType;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<Scalars['Int']>;
  defaultResourceConfigID?: Maybe<Scalars['ID']>;
  /** @deprecated Executor state tracked in LaunchAgent.AgentStatus */
  executorInfo: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  runQueueItem?: Maybe<RunQueueItem>;
  runQueueItems: RunQueueItemConnection;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RunQueueRunQueueItemArgs = {
  id: Scalars['ID'];
};

export type RunQueueRunQueueItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export enum RunQueueAccessType {
  Project = 'PROJECT',
  User = 'USER',
}

export type RunQueueItem = {
  __typename?: 'RunQueueItem';
  associatedRunId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  launchAgentId?: Maybe<Scalars['ID']>;
  runSpec: Scalars['JSON'];
  state: RunQueueItemState;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RunQueueItemConnection = {
  __typename?: 'RunQueueItemConnection';
  edges: Array<RunQueueItemEdge>;
  pageInfo: PageInfo;
};

export type RunQueueItemEdge = {
  __typename?: 'RunQueueItemEdge';
  cursor: Scalars['String'];
  node: RunQueueItem;
};

export enum RunQueueItemState {
  Claimed = 'CLAIMED',
  Failed = 'FAILED',
  Leased = 'LEASED',
  Pending = 'PENDING',
}

export type RunServicesAvailable = {
  __typename?: 'RunServicesAvailable';
  tensorboard?: Maybe<Scalars['Boolean']>;
};

export type RunStorageNode = StorageTreeNode & {
  __typename?: 'RunStorageNode';
  files: FileStorageNodeConnection;
  id: Scalars['ID'];
  name: Scalars['String'];
  run: Run;
  runID: Scalars['ID'];
  size: Scalars['Int64'];
};

export type RunStorageNodeFilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RunStorageNodeConnection = {
  __typename?: 'RunStorageNodeConnection';
  edges: Array<RunStorageNodeEdge>;
  pageInfo: PageInfo;
  totalSize: Scalars['Int64'];
};

export type RunStorageNodeEdge = {
  __typename?: 'RunStorageNodeEdge';
  cursor: Scalars['String'];
  node: RunStorageNode;
};

export type RunTable = {
  __typename?: 'RunTable';
  liveData: Array<Scalars['JSONString']>;
  parquetUrl?: Maybe<Scalars['String']>;
};

export type RunTag = {
  __typename?: 'RunTag';
  colorIndex: Scalars['Int'];
  name: Scalars['String'];
};

export type RunTagCount = {
  __typename?: 'RunTagCount';
  count: Scalars['Int'];
  name: Scalars['String'];
};

export type ScriptableRunCondition = {
  __typename?: 'ScriptableRunCondition';
  /** GraphQL doesn't allow empty types, so this always returns true */
  success: Scalars['Boolean'];
};

export type SendRequestOrgEmailDomainVerificationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationID: Scalars['ID'];
};

export type SendRequestOrgEmailDomainVerificationPayload = {
  __typename?: 'SendRequestOrgEmailDomainVerificationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ServerInfo = {
  __typename?: 'ServerInfo';
  actionHistoryLimit: Scalars['Int'];
  availableBucketProviders: Array<CloudProvider>;
  availableCloudRegions: Array<CloudRegion>;
  cliVersionInfo: Scalars['JSON'];
  defaultCloudRegion: CloudRegion;
  exposesExplicitRunQueueAckPath: Scalars['Boolean'];
  frontendHost: Scalars['String'];
  hasLocalLicense: Scalars['Boolean'];
  isGoogleIap: Scalars['Boolean'];
  latestLocalVersionInfo?: Maybe<LocalVersionInfo>;
  licenseExpirationUI?: Maybe<LicenseExpirationUi>;
  licenseFlags: Array<Scalars['String']>;
  messageOfTheDay?: Maybe<Scalars['String']>;
  pollingOK: Scalars['Boolean'];
  registeredModelLimitReached: Scalars['Boolean'];
  secureStorageConnectorEnabled: Scalars['Boolean'];
  slackClientID: Scalars['String'];
  userLimitReached: Scalars['Boolean'];
  viewOnlyUserLimitReached: Scalars['Boolean'];
};

export type ServerInfoActionHistoryLimitArgs = {
  artifactCollectionID?: InputMaybe<Scalars['ID']>;
  entityName?: InputMaybe<Scalars['String']>;
};

export type ServerInfoRegisteredModelLimitReachedArgs = {
  entityName: Scalars['String'];
};

export type SetDismissedBannerInput = {
  bannerID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type SetDismissedBannerPayload = {
  __typename?: 'SetDismissedBannerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type SetTagColorInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  colorIndex?: InputMaybe<Scalars['Int']>;
  entityName: Scalars['String'];
  projectName: Scalars['String'];
  tagName: Scalars['String'];
};

export type SetTagColorPayload = {
  __typename?: 'SetTagColorPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  tags: Array<RunTag>;
};

export type SlackChannelSubscription = AlertSubscription & {
  __typename?: 'SlackChannelSubscription';
  id: Scalars['ID'];
  slackIntegration: SlackIntegration;
};

export type SlackIntegration = Integration & {
  __typename?: 'SlackIntegration';
  channelName: Scalars['String'];
  id: Scalars['ID'];
  teamName: Scalars['String'];
};

export type StarViewInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type StarViewPayload = {
  __typename?: 'StarViewPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  view?: Maybe<View>;
};

export type StargazerConnection = {
  __typename?: 'StargazerConnection';
  edges: Array<StargazerEdge>;
  pageInfo: PageInfo;
};

export type StargazerEdge = {
  __typename?: 'StargazerEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type StartExperimentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type StopExperimentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type StopRunInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type StopRunPayload = {
  __typename?: 'StopRunPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type StoppedRunCondition = {
  __typename?: 'StoppedRunCondition';
  minimumRunDuration: Scalars['Duration'];
};

export type StorageBucketInfo = {
  __typename?: 'StorageBucketInfo';
  ID: Scalars['ID'];
  awsExternalID?: Maybe<Scalars['String']>;
  kmsKeyID?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  provider: CloudProvider;
};

export type StorageBucketInfoInput = {
  awsExternalID?: InputMaybe<Scalars['String']>;
  kmsKeyID?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  organizationID?: InputMaybe<Scalars['ID']>;
  provider: CloudProvider;
};

export type StorageTreeNode = {
  id: Scalars['ID'];
  name: Scalars['String'];
  size: Scalars['Int64'];
};

export type StripeBillingInfo = {
  __typename?: 'StripeBillingInfo';
  cancelAtPeriodEnd: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  currentPeriodEnd: Scalars['DateTime'];
  currentPeriodStart: Scalars['DateTime'];
  invoiceLink?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<PaymentMethod>;
  status: Scalars['String'];
  stripeSubscriptionId: Scalars['String'];
};

export type StripeInvoice = {
  __typename?: 'StripeInvoice';
  created: Scalars['DateTime'];
  currency: Scalars['String'];
  hostedInvoiceURL: Scalars['String'];
  invoicePDF: Scalars['String'];
  number: Scalars['String'];
  status: StripeInvoiceStatus;
  subscription?: Maybe<StripeSubscription>;
  total: Scalars['Int64'];
};

export enum StripeInvoiceStatus {
  Draft = 'DRAFT',
  Open = 'OPEN',
  Paid = 'PAID',
  Uncollectible = 'UNCOLLECTIBLE',
  Void = 'VOID',
}

export type StripePaymentMethod = {
  __typename?: 'StripePaymentMethod';
  card: StripePaymentMethodCard;
  isDefault: Scalars['Boolean'];
  isFailed: Scalars['Boolean'];
  stripePaymentMethodID: Scalars['String'];
  type: StripePaymentMethodType;
};

export type StripePaymentMethodCard = {
  __typename?: 'StripePaymentMethodCard';
  brand: CardBrand;
  last4: Scalars['String'];
};

export enum StripePaymentMethodType {
  Card = 'CARD',
}

export type StripePrice = {
  __typename?: 'StripePrice';
  amount: Scalars['Int64'];
  currency: Scalars['String'];
  interval?: Maybe<Scalars['String']>;
};

export type StripeSubscription = {
  __typename?: 'StripeSubscription';
  cancelAtPeriodEnd: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  currentPeriodEnd: Scalars['DateTime'];
  organizationSubscriptions: Array<OrganizationSubscription>;
  status: Scalars['String'];
};

export type SubmitBenchmarkRunInput = {
  benchmarkEntityName?: InputMaybe<Scalars['String']>;
  benchmarkName?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isCodeHidden?: InputMaybe<Scalars['Boolean']>;
};

export type SubmitBenchmarkRunPayload = {
  __typename?: 'SubmitBenchmarkRunPayload';
  benchmarkRun: BenchmarkRun;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type SubmitFcNewsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type SubmitFcNewsPayload = {
  __typename?: 'SubmitFCNewsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Sweep = Node & {
  __typename?: 'Sweep';
  agent?: Maybe<Agent>;
  agents: AgentConnection;
  bestLoss?: Maybe<Scalars['Float']>;
  config: Scalars['String'];
  controller?: Maybe<Scalars['JSONString']>;
  controllerRunName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  /** TODO: enum? */
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  earlyStopJobRunning: Scalars['Boolean'];
  heartbeatAt: Scalars['DateTime'];
  id: Scalars['ID'];
  method: Scalars['String'];
  name: Scalars['String'];
  priorRuns: RunConnection;
  project?: Maybe<Project>;
  runCount: Scalars['Int'];
  /** The number of runs that should be in the sweep when it completes. Grid search only. */
  runCountExpected?: Maybe<Scalars['Int']>;
  runTime: Scalars['Int'];
  /** TODO: non-null? */
  runs: RunConnection;
  scheduler?: Maybe<Scalars['JSONString']>;
  /** TODO: enum? */
  state: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type SweepAgentArgs = {
  agentName: Scalars['String'];
};

export type SweepRunsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type SweepConnection = {
  __typename?: 'SweepConnection';
  edges: Array<SweepEdge>;
  pageInfo: PageInfo;
};

export type SweepEdge = {
  __typename?: 'SweepEdge';
  cursor: Scalars['String'];
  node: Sweep;
};

export type Tag = {
  __typename?: 'Tag';
  attributes: Scalars['JSONString'];
  id: Scalars['ID'];
  name: Scalars['String'];
  objects?: Maybe<TaggedObjectConnection>;
  tagCategory?: Maybe<TagCategory>;
  tagCategoryName: Scalars['String'];
};

export type TagObjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  objectType?: InputMaybe<TaggedObjectType>;
};

export type TagCategory = {
  __typename?: 'TagCategory';
  group: TagGroup;
  id: Scalars['ID'];
  name: Scalars['String'];
  tags: TagConnection;
};

export type TagCategoryTagsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type TagConnection = {
  __typename?: 'TagConnection';
  edges: Array<TagEdge>;
  pageInfo: PageInfo;
};

export type TagEdge = {
  __typename?: 'TagEdge';
  cursor: Scalars['String'];
  node: Tag;
};

export type TagGroup = Entity;

export type TaggedObject = ArtifactPortfolio | ArtifactSequence;

export type TaggedObjectConnection = {
  __typename?: 'TaggedObjectConnection';
  edges: Array<TaggedObjectEdge>;
  pageInfo: PageInfo;
};

export type TaggedObjectEdge = {
  __typename?: 'TaggedObjectEdge';
  cursor: Scalars['String'];
  node: TaggedObject;
};

export enum TaggedObjectType {
  ArtifactCollection = 'ARTIFACT_COLLECTION',
}

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  progress: Scalars['Int'];
  state: TaskState;
  type: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum TaskState {
  Failed = 'FAILED',
  Finished = 'FINISHED',
  Pending = 'PENDING',
  Running = 'RUNNING',
}

export type Trigger = {
  __typename?: 'Trigger';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description?: Maybe<Scalars['String']>;
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  scope: TriggerScope;
  triggeredAction: TriggeredAction;
  triggeringCondition: TriggeringCondition;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TriggerConnection = {
  __typename?: 'TriggerConnection';
  edges: Array<TriggerEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TriggerEdge = {
  __typename?: 'TriggerEdge';
  cursor: Scalars['String'];
  node: Trigger;
};

export type TriggerScope = ArtifactPortfolio | ArtifactSequence | Project;

export enum TriggerScopeType {
  ArtifactCollection = 'ARTIFACT_COLLECTION',
  Project = 'PROJECT',
}

/**
 * type CronTriggeringCondition {
 *   schedule: CronSchedule!
 *   filter: String # when would this be used?
 * }
 */
export type TriggeredAction =
  | NotificationTriggeredAction
  | QueueJobTriggeredAction;

export type TriggeredActionConfig = {
  notificationActionInput?: InputMaybe<NotificationActionInput>;
  queueJobActionInput?: InputMaybe<QueueJobActionInput>;
};

export enum TriggeredActionType {
  Notification = 'NOTIFICATION',
  QueueJob = 'QUEUE_JOB',
}

export type TriggeringCondition = FilterEventTriggeringCondition;

export type UndeleteRunsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  filters: Scalars['JSONString'];
  projectName: Scalars['String'];
};

export type UndeleteRunsPayload = {
  __typename?: 'UndeleteRunsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UndeleteUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UndeleteUserPayload = {
  __typename?: 'UndeleteUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UnlinkArtifactInput = {
  artifactID: Scalars['ID'];
  artifactPortfolioID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type UnlinkArtifactPayload = {
  __typename?: 'UnlinkArtifactPayload';
  artifactID: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UnstarViewInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UnstarViewPayload = {
  __typename?: 'UnstarViewPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  view?: Maybe<View>;
};

export type UpdateAccessTokenInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateAccessTokenPayload = {
  __typename?: 'UpdateAccessTokenPayload';
  accessToken: AccessToken;
  clientMutationId?: Maybe<Scalars['String']>;
  recipientAlreadyOnTeam?: Maybe<Scalars['Boolean']>;
  success: Scalars['Boolean'];
  toNewUser?: Maybe<Scalars['Boolean']>;
};

export type UpdateAccessTokenProjectsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  projects: Array<ProjectSpecifier>;
  token: Scalars['String'];
};

export type UpdateAccessTokenProjectsPayload = {
  __typename?: 'UpdateAccessTokenProjectsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateAlertPayload = {
  __typename?: 'UpdateAlertPayload';
  alert: Alert;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateArtifactAction = ArtifactAction & {
  __typename?: 'UpdateArtifactAction';
  artifact: Artifact;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  initiator: Initiator;
  newAliases?: Maybe<Array<ArtifactAlias>>;
  newDescription?: Maybe<Scalars['String']>;
  newMetadata?: Maybe<Scalars['JSONString']>;
  newTags?: Maybe<Scalars['JSONString']>;
  oldAliases?: Maybe<Array<ArtifactAlias>>;
  oldDescription?: Maybe<Scalars['String']>;
  oldMetadata?: Maybe<Scalars['JSONString']>;
  oldTags?: Maybe<Scalars['JSONString']>;
};

export type UpdateArtifactCollectionPayload = {
  __typename?: 'UpdateArtifactCollectionPayload';
  artifactCollection: ArtifactCollection;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateArtifactInput = {
  aliases?: InputMaybe<Array<ArtifactAliasInput>>;
  artifactID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  labels?: InputMaybe<Scalars['JSONString']>;
  metadata?: InputMaybe<Scalars['JSONString']>;
};

export type UpdateArtifactManifestInput = {
  artifactManifestID: Scalars['ID'];
  baseArtifactID?: InputMaybe<Scalars['ID']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  digest?: InputMaybe<Scalars['String']>;
};

export type UpdateArtifactManifestPayload = {
  __typename?: 'UpdateArtifactManifestPayload';
  artifactManifest: ArtifactManifest;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateArtifactPayload = {
  __typename?: 'UpdateArtifactPayload';
  artifact: Artifact;
  artifactActions: Array<ArtifactAction>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateArtifactPortfolioInput = {
  artifactPortfolioID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateArtifactSequenceInput = {
  artifactSequenceID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateArtifactTypeInput = {
  artifactTypeID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
};

export type UpdateArtifactTypePayload = {
  __typename?: 'UpdateArtifactTypePayload';
  artifactType: ArtifactType;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateBenchmarkRunInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  state?: InputMaybe<Scalars['String']>;
};

export type UpdateBenchmarkRunPayload = {
  __typename?: 'UpdateBenchmarkRunPayload';
  benchmarkRun: BenchmarkRun;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateCustomChartInput = {
  access?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  entity: Scalars['String'];
  name: Scalars['String'];
  spec?: InputMaybe<Scalars['JSONString']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomChartPayload = {
  __typename?: 'UpdateCustomChartPayload';
  chart: CustomChart;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateCustomerDefaultPaymentMethodInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  paymentMethod: Scalars['String'];
};

export type UpdateCustomerDefaultPaymentMethodPayload = {
  __typename?: 'UpdateCustomerDefaultPaymentMethodPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateCustomerPaymentMethodInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  paymentMethod: Scalars['String'];
};

export type UpdateCustomerPaymentMethodPayload = {
  __typename?: 'UpdateCustomerPaymentMethodPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateDefaultResourceConfigInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  config: Scalars['JSONString'];
  defaultResourceConfigID: Scalars['ID'];
  entityName?: InputMaybe<Scalars['String']>;
  projectName?: InputMaybe<Scalars['String']>;
  resource?: InputMaybe<Scalars['String']>;
};

export type UpdateDefaultResourceConfigPayload = {
  __typename?: 'UpdateDefaultResourceConfigPayload';
  defaultResourceConfigID: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type UpdateDiscussionCommentInput = {
  body: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  discussionCommentID: Scalars['ID'];
  inlineCommentDetails?: InputMaybe<Scalars['JSONString']>;
  viewID?: InputMaybe<Scalars['ID']>;
};

export type UpdateDiscussionCommentPayload = {
  __typename?: 'UpdateDiscussionCommentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  discussionComment: DiscussionComment;
};

export type UpdateDiscussionThreadInput = {
  body: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  discussionThreadID: Scalars['ID'];
};

export type UpdateDiscussionThreadPayload = {
  __typename?: 'UpdateDiscussionThreadPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  discussionThread: DiscussionThread;
};

export type UpdateEntityInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  codeSavingEnabled?: InputMaybe<Scalars['Boolean']>;
  defaultAccess?: InputMaybe<Scalars['String']>;
  entity: Scalars['String'];
  isPaid?: InputMaybe<Scalars['Boolean']>;
  photoUrl?: InputMaybe<Scalars['String']>;
  privateOnly?: InputMaybe<Scalars['Boolean']>;
  rateLimits?: InputMaybe<RateLimitsInput>;
  settings?: InputMaybe<EntitySettingsInput>;
};

export type UpdateEntityPayload = {
  __typename?: 'UpdateEntityPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  entity?: Maybe<Entity>;
};

export type UpdateExperimentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  enrollmentPeriod: Scalars['Int'];
  experimentType: ExperimentType;
  id: Scalars['ID'];
  metadata?: InputMaybe<Scalars['JSONString']>;
  name: Scalars['String'];
  observationalUnit: ObservationalUnit;
  sampleSize: Scalars['Int'];
  variants: Array<VariantInput>;
};

export type UpdateExperimentPayload = {
  __typename?: 'UpdateExperimentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type UpdateLaunchAgentInput = {
  agentStatus?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  heartbeatAt?: InputMaybe<Scalars['DateTime']>;
  launchAgentId: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  runQueues?: InputMaybe<Array<Scalars['ID']>>;
  stopPolling?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateLaunchAgentPayload = {
  __typename?: 'UpdateLaunchAgentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateLocalLicenseInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  notes?: InputMaybe<Scalars['String']>;
};

export type UpdateLocalLicensePayload = {
  __typename?: 'UpdateLocalLicensePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  localLicense: LocalLicense;
};

export type UpdateMemberInput = {
  admin?: InputMaybe<Scalars['Boolean']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
  user: Scalars['ID'];
};

export type UpdateMemberPayload = {
  __typename?: 'UpdateMemberPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  member: Member;
};

export type UpdateOrganizationBillingUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  newBillingUser: Scalars['ID'];
  organizationId: Scalars['ID'];
};

export type UpdateOrganizationBillingUserPayload = {
  __typename?: 'UpdateOrganizationBillingUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateOrganizationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  flags?: InputMaybe<Scalars['JSONString']>;
  name?: InputMaybe<Scalars['String']>;
  organizationID: Scalars['ID'];
};

export type UpdateOrganizationPayload = {
  __typename?: 'UpdateOrganizationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateOrganizationSubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  createStripeSubscription?: InputMaybe<Scalars['Boolean']>;
  expiresAt?: InputMaybe<Scalars['DateTime']>;
  organizationSubscriptionID: Scalars['ID'];
  planID?: InputMaybe<Scalars['ID']>;
  privileges?: InputMaybe<Scalars['JSONString']>;
  seats?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<OrganizationSubscriptionStatus>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<OrganizationSubscriptionType>;
};

export type UpdateOrganizationSubscriptionPayload = {
  __typename?: 'UpdateOrganizationSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateOrganizationUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  userName: Scalars['String'];
  userOrgRole: Scalars['String'];
};

export type UpdateOrganizationUserPayload = {
  __typename?: 'UpdateOrganizationUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateRampThresholdInput = {
  checkId: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  setting: Scalars['String'];
  store: Scalars['String'];
  threshold: Scalars['Float'];
};

export type UpdateRampThresholdPayload = {
  __typename?: 'UpdateRampThresholdPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateStoppedRunAlertInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  minimumRunDuration?: InputMaybe<Scalars['Duration']>;
};

export type UpdateSubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  gpuEnabled?: InputMaybe<Scalars['DateTime']>;
  hubPreset?: InputMaybe<Scalars['String']>;
  hubSettings?: InputMaybe<HubSettingsInput>;
  privateProjects?: InputMaybe<Scalars['Boolean']>;
  teamsEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateSubscriptionPayload = {
  __typename?: 'UpdateSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  entity?: Maybe<Entity>;
};

export type UpdateTagCategoryInput = {
  clientMutationID?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  newTagCategoryName?: InputMaybe<Scalars['String']>;
  oldTagCategoryName: Scalars['String'];
};

export type UpdateTagCategoryPayload = {
  __typename?: 'UpdateTagCategoryPayload';
  clientMutationID?: Maybe<Scalars['String']>;
  tagCategory: TagCategory;
};

export type UpdateTagInput = {
  attributes?: InputMaybe<Scalars['JSONString']>;
  clientMutationID?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  newTagName?: InputMaybe<Scalars['String']>;
  oldTagName: Scalars['String'];
  tagCategoryName: Scalars['String'];
};

export type UpdateUserEmailInput = {
  id: Scalars['ID'];
  type?: InputMaybe<EmailType>;
};

export type UpdateUserEmailPayload = {
  __typename?: 'UpdateUserEmailPayload';
  email?: Maybe<Email>;
  success: Scalars['Boolean'];
};

export type UpdateUserInput = {
  admin?: InputMaybe<Scalars['Boolean']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  defaultEntity?: InputMaybe<Scalars['String']>;
  defaultFramework?: InputMaybe<Scalars['String']>;
  galleryVisited?: InputMaybe<Scalars['Boolean']>;
  hideTeamsFromPublic?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  onboardingHidden?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  /** deprecated */
  photoUrl?: InputMaybe<Scalars['String']>;
  /** null implies "self" -- only admins can edit others */
  primaryEmail?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
  settingsVisited?: InputMaybe<Scalars['Boolean']>;
  userInfo?: InputMaybe<Scalars['JSONString']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UpgradeCustomerSubscriptionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationID: Scalars['ID'];
  paymentMethod: Scalars['String'];
  planID: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type UpgradeCustomerSubscriptionPayload = {
  __typename?: 'UpgradeCustomerSubscriptionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  organizationID: Scalars['ID'];
  subscription?: Maybe<Scalars['JSON']>;
};

export type UploadPanelInput = {
  author: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  entityName: Scalars['String'];
  panelID: Scalars['String'];
  redirectURL: Scalars['String'];
  title: Scalars['String'];
  viewID: Scalars['ID'];
};

export type UploadPanelPayload = {
  __typename?: 'UploadPanelPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  panelImageUploadUrl: Scalars['String'];
  panelLink: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UpsertBucketInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  commit?: InputMaybe<Scalars['String']>;
  /** deprecated */
  config?: InputMaybe<Scalars['JSONString']>;
  debug?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  framework?: InputMaybe<Scalars['String']>;
  groupName?: InputMaybe<Scalars['String']>;
  host?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  jobProgram?: InputMaybe<Scalars['String']>;
  jobRepo?: InputMaybe<Scalars['String']>;
  jobType?: InputMaybe<Scalars['String']>;
  modelName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  runQueueItemId?: InputMaybe<Scalars['ID']>;
  state?: InputMaybe<Scalars['String']>;
  summaryMetrics?: InputMaybe<Scalars['JSONString']>;
  sweep?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UpsertBucketPayload = {
  __typename?: 'UpsertBucketPayload';
  bucket?: Maybe<Run>;
  clientMutationId?: Maybe<Scalars['String']>;
  inserted?: Maybe<Scalars['Boolean']>;
  updateAvailable?: Maybe<Scalars['Boolean']>;
};

export type UpsertModelInput = {
  access?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  dockerImage?: InputMaybe<Scalars['String']>;
  /** deprecated */
  entityName?: InputMaybe<Scalars['String']>;
  framework?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isBenchmark?: InputMaybe<Scalars['Boolean']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  linkedBenchmark?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  repo?: InputMaybe<Scalars['String']>;
  views?: InputMaybe<Scalars['JSONString']>;
};

export type UpsertModelPayload = {
  __typename?: 'UpsertModelPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  entityName?: Maybe<Scalars['String']>;
  inserted?: Maybe<Scalars['Boolean']>;
  model?: Maybe<Project>;
  project?: Maybe<Project>;
};

export type UpsertRunGroupInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  name: Scalars['String'];
  newName?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  projectName: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type UpsertRunGroupPayload = {
  __typename?: 'UpsertRunGroupPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  group?: Maybe<RunGroup>;
  inserted?: Maybe<Scalars['Boolean']>;
};

export type UpsertSharedViewInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  name: Scalars['String'];
  spec: Scalars['String'];
  type: Scalars['String'];
};

export type UpsertSharedViewPayload = {
  __typename?: 'UpsertSharedViewPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  view?: Maybe<View>;
};

export type UpsertSweepInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  config?: InputMaybe<Scalars['String']>;
  controller?: InputMaybe<Scalars['JSONString']>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  launchScheduler?: InputMaybe<Scalars['JSONString']>;
  priorRunsFilters?: InputMaybe<Scalars['JSONString']>;
  projectName?: InputMaybe<Scalars['String']>;
  scheduler?: InputMaybe<Scalars['JSONString']>;
  state?: InputMaybe<Scalars['String']>;
};

export type UpsertSweepPayload = {
  __typename?: 'UpsertSweepPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  configValidationWarnings: Array<Scalars['String']>;
  inserted?: Maybe<Scalars['Boolean']>;
  insertedPriorRuns?: Maybe<Scalars['Int']>;
  sweep?: Maybe<Sweep>;
};

export type UpsertViewInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  coverUrl?: InputMaybe<Scalars['String']>;
  createdUsing?: InputMaybe<ViewSource>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  entityName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  locked?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['ID']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  projectName?: InputMaybe<Scalars['String']>;
  showcasedAt?: InputMaybe<Scalars['DateTime']>;
  spec?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpsertViewPayload = {
  __typename?: 'UpsertViewPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  inserted?: Maybe<Scalars['Boolean']>;
  view?: Maybe<View>;
};

export type UsageStat = {
  __typename?: 'UsageStat';
  date?: Maybe<Scalars['DateTime']>;
  stat?: Maybe<Scalars['Float']>;
};

export type UsageStatConnection = {
  __typename?: 'UsageStatConnection';
  edges: Array<UsageStatEdge>;
  pageInfo: PageInfo;
};

export type UsageStatEdge = {
  __typename?: 'UsageStatEdge';
  cursor: Scalars['String'];
  node: UsageStat;
};

export type UseArtifactAction = ArtifactAction & {
  __typename?: 'UseArtifactAction';
  artifact: Artifact;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  initiator: Initiator;
};

export type UseArtifactInput = {
  artifactID: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityName: Scalars['String'];
  projectName: Scalars['String'];
  runName: Scalars['String'];
  usedAs?: InputMaybe<Scalars['String']>;
};

export type UseArtifactPayload = {
  __typename?: 'UseArtifactPayload';
  artifact: Artifact;
  clientMutationId?: Maybe<Scalars['String']>;
  run: Run;
};

export type User = Node & {
  __typename?: 'User';
  accountType?: Maybe<UserAccountType>;
  admin?: Maybe<Scalars['Boolean']>;
  apiKey?: Maybe<Scalars['String']>;
  apiKeys?: Maybe<ApiKeyConnection>;
  /** @deprecated No longer supported */
  authId?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dailyRunCount: Array<Scalars['Int']>;
  defaultEntity?: Maybe<Entity>;
  defaultEntityId?: Maybe<Scalars['Int']>;
  defaultFramework?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  emails: Array<Email>;
  entity?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['JSONString']>;
  hideTeamsFromPublic: Scalars['Boolean'];
  id: Scalars['ID'];
  limits?: Maybe<Scalars['JSON']>;
  loggedInAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  /** @deprecated No longer supported */
  ndbId?: Maybe<Scalars['ID']>;
  newsletterSubscription?: Maybe<NewsletterSubscription>;
  onboardingSteps?: Maybe<Scalars['JSON']>;
  organizations: Array<Organization>;
  photoUploadUrl: Scalars['String'];
  photoUrl?: Maybe<Scalars['String']>;
  private: Scalars['Boolean'];
  projects?: Maybe<ProjectConnection>;
  runs?: Maybe<RunConnection>;
  signupRequired: Scalars['Boolean'];
  starredViews?: Maybe<ViewConnection>;
  teams?: Maybe<EntityConnection>;
  totalRuns: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  uploadHeaders: Array<Scalars['String']>;
  userEntity?: Maybe<Entity>;
  userInfo?: Maybe<Scalars['JSON']>;
  username?: Maybe<Scalars['String']>;
  views?: Maybe<ViewConnection>;
};

export type UserApiKeysArgs = {
  after?: InputMaybe<Scalars['String']>;
  batchSize?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keysOnly?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type UserDailyRunCountArgs = {
  limit: Scalars['Int'];
};

export type UserOrganizationsArgs = {
  emailDomain?: InputMaybe<Scalars['String']>;
};

export type UserProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  linkedBenchmark?: InputMaybe<ProjectIdentifierInput>;
  order?: InputMaybe<Scalars['String']>;
  restrictTo?: InputMaybe<UserProjectRestriction>;
};

export type UserRunsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
};

export type UserStarredViewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserTeamsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserViewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  viewType?: InputMaybe<Scalars['String']>;
};

export enum UserAccountType {
  Anonymous = 'ANONYMOUS',
  Service = 'SERVICE',
  User = 'USER',
  Viewer = 'VIEWER',
}

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

/** deprecated */
export enum UserProjectRestriction {
  Contributed = 'CONTRIBUTED',
  Owned = 'OWNED',
}

export type Variant = {
  __typename?: 'Variant';
  allocation: Scalars['Int'];
  bucket: Scalars['Int'];
  description: Scalars['String'];
};

export type VariantInput = {
  allocation: Scalars['Int'];
  bucket: Scalars['Int'];
  description: Scalars['String'];
};

export type VersionedArtifactConnection = ArtifactConnectionType & {
  __typename?: 'VersionedArtifactConnection';
  edges: Array<VersionedArtifactEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VersionedArtifactEdge = ArtifactEdgeType & {
  __typename?: 'VersionedArtifactEdge';
  cursor: Scalars['String'];
  node: Artifact;
  version: Scalars['String'];
};

export type View = Node & {
  __typename?: 'View';
  accessTokens: Array<AccessToken>;
  alertSubscription?: Maybe<AlertSubscription>;
  children?: Maybe<ViewConnection>;
  coverUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdUsing: ViewSource;
  description?: Maybe<Scalars['String']>;
  discussionThreads: DiscussionThreadConnection;
  displayName?: Maybe<Scalars['String']>;
  entity?: Maybe<Entity>;
  entityName: Scalars['String'];
  id: Scalars['ID'];
  imageUploadUrl: ImageUrl;
  locked: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
  previewUrl?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  projectName: Scalars['String'];
  showcasedAt?: Maybe<Scalars['DateTime']>;
  spec?: Maybe<Scalars['JSONString']>;
  starCount: Scalars['Int'];
  stargazers: StargazerConnection;
  starred?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<User>;
  uploadHeaders: Array<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
  viewCount: Scalars['Int'];
};

export type ViewDiscussionThreadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ViewImageUploadUrlArgs = {
  name: Scalars['String'];
};

export type ViewStarCountArgs = {
  from?: InputMaybe<Scalars['DateTime']>;
  to?: InputMaybe<Scalars['DateTime']>;
};

export type ViewStargazersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ViewConnection = {
  __typename?: 'ViewConnection';
  edges: Array<ViewEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ViewEdge = {
  __typename?: 'ViewEdge';
  cursor: Scalars['String'];
  node?: Maybe<View>;
};

export enum ViewSource {
  WandbSdk = 'WANDB_SDK',
  WandbUi = 'WANDB_UI',
  WandbUiSharePanel = 'WANDB_UI_SHARE_PANEL',
}

export type ViewViewInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ViewViewPayload = {
  __typename?: 'ViewViewPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type WbInstance = {
  __typename?: 'WBInstance';
  artifactSequences?: Maybe<ArtifactSequenceConnection>;
  entities: Array<Entity>;
  projects?: Maybe<ProjectConnection>;
  views: ViewConnection;
};

export type WbInstanceArtifactSequencesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Scalars['JSONString']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type WbInstanceProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type WbInstanceViewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export enum WorkflowsAdminType {
  Model = 'MODEL',
}

export type UpsertBucketMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Scalars['String']>;
  entity?: InputMaybe<Scalars['String']>;
  groupName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  commit?: InputMaybe<Scalars['String']>;
  config?: InputMaybe<Scalars['JSONString']>;
  host?: InputMaybe<Scalars['String']>;
  debug?: InputMaybe<Scalars['Boolean']>;
  program?: InputMaybe<Scalars['String']>;
  repo?: InputMaybe<Scalars['String']>;
  jobType?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  sweep?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  summaryMetrics?: InputMaybe<Scalars['JSONString']>;
}>;

export type UpsertBucketMutation = {
  __typename?: 'Mutation';
  upsertBucket?: {
    __typename?: 'UpsertBucketPayload';
    inserted?: boolean | null;
    bucket?: {
      __typename?: 'Run';
      id: string;
      name: string;
      displayName?: string | null;
      description?: string | null;
      config?: any | null;
      sweepName?: string | null;
      project?: {
        __typename?: 'Project';
        id: string;
        name: string;
        entity: {__typename?: 'Entity'; id: string; name: string};
      } | null;
    } | null;
  } | null;
};

export type ViewerQueryVariables = Exact<{[key: string]: never}>;

export type ViewerQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'User';
    id: string;
    entity?: string | null;
    flags?: any | null;
    teams?: {
      __typename?: 'EntityConnection';
      edges: Array<{
        __typename?: 'EntityEdge';
        node?: {__typename?: 'Entity'; name: string} | null;
      }>;
    } | null;
  } | null;
};

export type RunUploadUrlsQueryVariables = Exact<{
  name: Scalars['String'];
  files: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
  entity?: InputMaybe<Scalars['String']>;
  run: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;

export type RunUploadUrlsQuery = {
  __typename?: 'Query';
  model?: {
    __typename?: 'Project';
    bucket?: {
      __typename?: 'Run';
      id: string;
      files?: {
        __typename?: 'FileConnection';
        uploadHeaders: Array<string>;
        edges: Array<{
          __typename?: 'FileEdge';
          node?: {
            __typename?: 'File';
            name: string;
            url?: string | null;
            updatedAt?: any | null;
          } | null;
        }>;
      } | null;
    } | null;
  } | null;
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: {hash: string}) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const UpsertBucketDocument = new TypedDocumentString(`
    mutation UpsertBucket($id: String, $name: String, $project: String, $entity: String, $groupName: String, $description: String, $displayName: String, $notes: String, $commit: String, $config: JSONString, $host: String, $debug: Boolean, $program: String, $repo: String, $jobType: String, $state: String, $sweep: String, $tags: [String!], $summaryMetrics: JSONString) {
  upsertBucket(
    input: {id: $id, name: $name, groupName: $groupName, modelName: $project, entityName: $entity, description: $description, displayName: $displayName, notes: $notes, config: $config, commit: $commit, host: $host, debug: $debug, jobProgram: $program, jobRepo: $repo, jobType: $jobType, state: $state, sweep: $sweep, tags: $tags, summaryMetrics: $summaryMetrics}
  ) {
    bucket {
      id
      name
      displayName
      description
      config
      sweepName
      project {
        id
        name
        entity {
          id
          name
        }
      }
    }
    inserted
  }
}
    `) as unknown as TypedDocumentString<
  UpsertBucketMutation,
  UpsertBucketMutationVariables
>;
export const ViewerDocument = new TypedDocumentString(`
    query Viewer {
  viewer {
    id
    entity
    flags
    teams {
      edges {
        node {
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ViewerQuery, ViewerQueryVariables>;
export const RunUploadUrlsDocument = new TypedDocumentString(`
    query RunUploadUrls($name: String!, $files: [String]!, $entity: String, $run: String!, $description: String) {
  model(name: $name, entityName: $entity) {
    bucket(name: $run, desc: $description) {
      id
      files(names: $files) {
        uploadHeaders
        edges {
          node {
            name
            url(upload: true)
            updatedAt
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
  RunUploadUrlsQuery,
  RunUploadUrlsQueryVariables
>;
