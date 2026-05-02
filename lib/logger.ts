export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'ERROR' | 'SUCCESS' | 'WARNING';
  message: string;
  data?: any;
  source?: string;
}

class Logger {
  private logs: LogEntry[] = [];

  private createEntry(level: LogEntry['level'], message: string, data?: any, source?: string): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      source
    };
    
    this.logs.push(entry);
    this.logToConsole(entry);
    
    return entry;
  }

  private logToConsole(entry: LogEntry) {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const source = entry.source ? `[${entry.source}]` : '';
    const prefix = `[${timestamp}] ${source} ${entry.level}:`;
    
    switch (entry.level) {
      case 'SUCCESS':
        console.log(`✅ ${prefix} ${entry.message}`, entry.data || '');
        break;
      case 'ERROR':
        console.error(`❌ ${prefix} ${entry.message}`, entry.data || '');
        break;
      case 'WARNING':
        console.warn(`⚠️ ${prefix} ${entry.message}`, entry.data || '');
        break;
      case 'INFO':
      default:
        console.log(`ℹ️ ${prefix} ${entry.message}`, entry.data || '');
        break;
    }
  }

  info(message: string, data?: any, source?: string) {
    return this.createEntry('INFO', message, data, source);
  }

  success(message: string, data?: any, source?: string) {
    return this.createEntry('SUCCESS', message, data, source);
  }

  error(message: string, data?: any, source?: string) {
    return this.createEntry('ERROR', message, data, source);
  }

  warning(message: string, data?: any, source?: string) {
    return this.createEntry('WARNING', message, data, source);
  }

  // Log API responses
  logApiResponse(url: string, method: string, status: number, responseTime: number, data?: any) {
    const level = status >= 400 ? 'ERROR' : status >= 300 ? 'WARNING' : 'SUCCESS';
    
    // Simulate backend server response format
    const backendMessage = this.formatBackendResponse(method, url, status, responseTime, data);
    
    return this.createEntry(level, backendMessage, data, 'BACKEND');
  }

  private formatBackendResponse(method: string, url: string, status: number, responseTime: number, data?: any): string {
    const timestamp = new Date().toISOString();
    const statusText = this.getStatusText(status);
    const backendUrl = url.replace('/api', '').replace(/^\//, '') || 'root';
    
    let response = `🌐 BACKEND SERVER RESPONSE\n`;
    response += `┌─ Timestamp: ${timestamp}\n`;
    response += `├─ Method: ${method}\n`;
    response += `├─ Endpoint: /${backendUrl}\n`;
    response += `├─ Status: ${status} ${statusText}\n`;
    response += `├─ Response Time: ${responseTime}ms\n`;
    response += `├─ Server: Node.js/Express (simulated)\n`;
    
    if (data) {
      response += `├─ Response Data: ${JSON.stringify(data, null, 2).split('\n').map(line => `│   ${line}`).join('\n')}\n`;
    }
    
    response += `└─ Connection: closed`;
    
    return response;
  }

  private getStatusText(status: number): string {
    const statusMap: Record<number, string> = {
      200: 'OK',
      201: 'Created',
      204: 'No Content',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable'
    };
    
    return statusMap[status] || 'Unknown';
  }

  // Log form submissions
  logFormSubmission(formName: string, data: any, success: boolean) {
    const level = success ? 'SUCCESS' : 'ERROR';
    
    // Simulate backend processing response
    const backendMessage = this.formatFormSubmissionResponse(formName, data, success);
    
    return this.createEntry(level, backendMessage, { formData: data }, 'BACKEND');
  }

  private formatFormSubmissionResponse(formName: string, data: any, success: boolean): string {
    const timestamp = new Date().toISOString();
    const processingTime = Math.floor(Math.random() * 200) + 50; // Simulate 50-250ms processing time
    
    let response = `📝 BACKEND FORM PROCESSING\n`;
    response += `┌─ Timestamp: ${timestamp}\n`;
    response += `├─ Form: ${formName}\n`;
    response += `├─ Action: ${success ? 'PROCESSING_SUCCESS' : 'PROCESSING_ERROR'}\n`;
    response += `├─ Processing Time: ${processingTime}ms\n`;
    response += `├─ Server: Node.js/Express (simulated)\n`;
    response += `├─ Database: PostgreSQL (simulated)\n`;
    
    if (success) {
      response += `├─ Status: Data saved successfully\n`;
      if (data.id) {
        response += `├─ Record ID: ${data.id}\n`;
      }
    } else {
      response += `├─ Status: Processing failed\n`;
      if (data.error) {
        response += `├─ Error: ${data.error}\n`;
      }
    }
    
    response += `└─ Connection: closed`;
    
    return response;
  }

  // Get all logs
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
  }
}

export const logger = new Logger();
