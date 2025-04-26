export interface HyperKycConfigInstance {
  setUniqueId: (id: string) => void;
}

export interface HyperKycEvent {
  status: "user_cancelled" | "error" | "auto_approved" | "auto_declined" | "needs_review";
  errorCode?: number;
  errorMessage?: string;
  latestModule?: string;
  transactionId: string;
}

export interface HyperKycModule {
  prefetch: (config: { appId: string; workflowId: string }) => void;
  launch: (config: HyperKycConfigInstance, handler: (event: HyperKycEvent) => void) => void;
}
