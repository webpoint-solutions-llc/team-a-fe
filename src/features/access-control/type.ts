// This type is used to define the resources that the application will interact with.
// It is used to define the feature flag implementation and access control policy and to enforce type safety.
export type TResource =
  | "posts"
  | "church"
  | "user"
  | "church-event"
  | "evangelistic-meeting";

export type TAction =
  | "*"
  | "show"
  | "create"
  | "read"
  | "update"
  | "delete"
  | "list"
  | "export";

export type TAccessControlStatement = {
  actions: Array<TAction>;
  resource: TResource;
  effect: "allow" | "deny";
  records?: Array<string>;
};

export type TAccessControlPolicy = Array<TAccessControlStatement>;

export interface TAccessControlContextType {
  accessControlPolicy: TAccessControlPolicy;
}
