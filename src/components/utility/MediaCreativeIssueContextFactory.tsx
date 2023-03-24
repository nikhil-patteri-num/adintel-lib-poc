import * as React from 'react';

/* 
 - This is a singleton class which stores the context for media creative issue
 - The context will be provided by IndexingDetailStepOneContainer and ClassificationDetailStepOneContainer.
 - The Context is consumed by CreativePlayer.
*/
export class MediaCreativeIssueContext {
  private static instance: MediaCreativeIssueContext;
  public context: any;
  public static getInstance(): MediaCreativeIssueContext {
    if (!MediaCreativeIssueContext.instance) {
      MediaCreativeIssueContext.instance = new MediaCreativeIssueContext();
      MediaCreativeIssueContext.instance.context = React.createContext({});
    }
    return MediaCreativeIssueContext.instance;
  }
}
