export interface LogsClientConfig {
  /**
   * The application key (required)
   */
  appKey: string;
  /**
   * The table key (required)
   */
  tableKey: string;
  /**
   * The base URL of the logging service (default: http://localhost:3000)
   */
  baseUrl?: string;
}

export default class LogsClient {
  private appKey: string;
  private tableKey: string;
  private baseUrl: string;

  /**
   * Initialize the logs client
   * @param config Configuration object
   */
  constructor({ appKey, tableKey, baseUrl }: LogsClientConfig) {
    if (!appKey) {
      throw new Error("appKey is required");
    }
    if (!tableKey) {
      throw new Error("tableKey is required");
    }

    this.appKey = appKey;
    this.tableKey = tableKey;
    // Remove trailing slash if present
    this.baseUrl = (baseUrl || "http://localhost:3000").replace(/\/$/, "");
  }

  /**
   * Report a log message
   * @param messageType The type of message (e.g., 'info', 'warn', 'error')
   * @param content The content of the log
   * @returns Returns true if successful, false otherwise
   */
  async addMessage(messageType: string, content: object | string): Promise<boolean> {
    if (!messageType) {
      console.error("messageType is required");
      return false;
    }

    const url = `${this.baseUrl}/api/logs/report`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appKey: this.appKey,
          tableKey: this.tableKey,
          messageType,
          content,
        }),
      });

      if (!response.ok) {
        console.error(`Failed to report log: ${response.status} ${response.statusText}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error reporting log:", error);
      return false;
    }
  }
}
