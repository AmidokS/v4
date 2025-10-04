// === ПРОСТАЯ МОБИЛЬНАЯ ДЕТЕКЦИЯ ===

function isMobileDevice() {
  // Простая и надежная детекция мобильных устройств
  const userAgent = navigator.userAgent || '';
  
  // Проверяем User Agent на мобильные паттерны
  const isMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent) ||
                     /xiaomi|poco|miui|samsung|huawei|oppo|vivo|oneplus/i.test(userAgent);
  
  // Проверяем тач-поддержку
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Проверяем размер экрана
  const isNarrowScreen = window.innerWidth <= 1200 || window.screen.width <= 1200;
  
  // Проверяем соотношение сторон (мобильные обычно высокие)
  const aspectRatio = Math.max(window.screen.width, window.screen.height) / 
                     Math.min(window.screen.width, window.screen.height);
  const isMobileAspectRatio = aspectRatio > 1.3;
  
  // Комбинированная логика
  const isMobile = isMobileUA || 
                   (hasTouch && isNarrowScreen) ||
                   (hasTouch && isMobileAspectRatio);

  console.log('📱 Детекция мобильного устройства:', {
    userAgent: userAgent.substring(0, 100) + '...',
    isMobileUA: isMobileUA,
    hasTouch: hasTouch,
    screenWidth: window.screen.width,
    viewportWidth: window.innerWidth,
    isNarrowScreen: isNarrowScreen,
    aspectRatio: aspectRatio.toFixed(2),
    isMobileAspectRatio: isMobileAspectRatio,
    finalResult: isMobile
  });

  return isMobile;
}

// Применяем мобильные классы при загрузке
if (isMobileDevice()) {
  document.documentElement.classList.add('mobile-device');
  document.body.classList.add('mobile-device', 'force-mobile');
  
  // Принудительно применяем мобильные стили
  const forceMobileStyles = () => {
    console.log('🔧 Принудительное применение мобильных стилей');
    
    // Контейнеры
    const containers = document.querySelectorAll('.container');
    containers.forEach(c => {
      c.style.setProperty('max-width', '100%', 'important');
      c.style.setProperty('padding', '15px', 'important');
    });
    
    // Сетки
    const grids = document.querySelectorAll('.stats-grid, .panel-grid');
    grids.forEach(g => {
      g.style.setProperty('grid-template-columns', '1fr', 'important');
      g.style.setProperty('gap', '15px', 'important');
    });
    
    // Элементы форм
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.style.setProperty('padding', '16px', 'important');
      input.style.setProperty('font-size', '16px', 'important');
      input.style.setProperty('min-height', '48px', 'important');
    });
    
    // Кнопки
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(btn => {
      btn.style.setProperty('padding', '16px 24px', 'important');
      btn.style.setProperty('font-size', '16px', 'important');
      btn.style.setProperty('min-height', '48px', 'important');
    });
  };
  
  // Применяем стили сразу и после загрузки
  forceMobileStyles();
  document.addEventListener('DOMContentLoaded', forceMobileStyles);
  
  console.log('📱 Мобильное устройство обнаружено и стили применены');
} else {
  document.documentElement.classList.add('desktop-device');
  console.log('🖥️ Десктопное устройство обнаружено');
}

// Диагностическая функция для отладки
function diagnosticInfo() {
  const info = {
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    touchSupport: 'ontouchstart' in window,
    maxTouchPoints: navigator.maxTouchPoints,
    documentClasses: document.documentElement.className,
    bodyClasses: document.body?.className || 'body not ready',
    isMobileDetected: document.documentElement.classList.contains('mobile-device')
  };
  
  console.log('🔍 ДИАГНОСТИКА УСТРОЙСТВА:', info);
  
  // Создаём визуальную диагностику на экране
  const panel = document.createElement('div');
  panel.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    background: #000;
    color: #0f0;
    padding: 15px;
    border-radius: 8px;
    font-family: monospace;
    font-size: 12px;
    z-index: 10000;
    border: 2px solid #0f0;
  `;
  
  panel.innerHTML = `
    <div style="text-align: center; margin-bottom: 10px;">
      <strong>📱 ДИАГНОСТИКА POCO</strong>
      <button onclick="this.parentElement.parentElement.remove()" 
              style="float: right; background: #f00; color: white; border: none; padding: 5px; border-radius: 3px;">✕</button>
    </div>
    <div><strong>Статус:</strong> ${info.isMobileDetected ? '✅ МОБИЛЬНОЕ' : '❌ ДЕСКТОПНОЕ'}</div>
    <div><strong>Размеры:</strong> ${info.screenWidth}x${info.screenHeight} (экран), ${info.viewportWidth}x${info.viewportHeight} (viewport)</div>
    <div><strong>Touch:</strong> ${info.touchSupport ? '✅' : '❌'} (${info.maxTouchPoints} точек)</div>
    <div><strong>User Agent:</strong> ${info.userAgent.substring(0, 50)}...</div>
    <div><strong>CSS классы:</strong> ${info.documentClasses}</div>
    <div style="margin-top: 10px;">
      <button onclick="forceMobileMode()" style="background: #0a0; color: white; border: none; padding: 8px; border-radius: 4px; width: 100%;">
        🔧 ПРИНУДИТЕЛЬНАЯ МОБИЛИЗАЦИЯ
      </button>
    </div>
  `;
  
  document.body.appendChild(panel);
  
  return info;
}

// Функция принудительной мобилизации
function forceMobileMode() {
  console.log('🔧 ПРИНУДИТЕЛЬНАЯ МОБИЛИЗАЦИЯ');
  
  document.documentElement.classList.add('mobile-device');
  document.body.classList.add('mobile-device', 'force-mobile');
  
  // Применяем стили
  const containers = document.querySelectorAll('.container');
  containers.forEach(c => {
    c.style.setProperty('max-width', '100%', 'important');
    c.style.setProperty('padding', '15px', 'important');
  });
  
  const grids = document.querySelectorAll('.stats-grid, .panel-grid');
  grids.forEach(g => {
    g.style.setProperty('grid-template-columns', '1fr', 'important');
  });
  
  alert('✅ Принудительная мобилизация выполнена!');
}