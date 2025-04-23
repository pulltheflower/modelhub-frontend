export function formatDate(dateString: string): string {
  if (!dateString || dateString === '0001-01-01T00:00:00Z') {
    return '未知时间';
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '无效日期';
    }

    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('日期格式化错误:', error);
    return '无效日期';
  }
} 