# SkiaFlow - React Native Skia 테스트 레포지토리 🎨

이 레포지토리는 [React Native Skia](https://shopify.github.io/react-native-skia/) 라이브러리를 테스트하고 실험하기 위한 [Expo](https://expo.dev) 프로젝트입니다.

## 📋 프로젝트 목적

이 레포지토리는 React Native Skia 라이브러리의 다양한 기능들을 직접 사용해보고, 제대로 동작하는지 확인하기 위한 테스트 환경입니다.

- ✅ Skia 라이브러리 설치 및 설정 확인
- 🧪 다양한 Skia 기능 테스트 및 실험
- 📝 코드 예제 작성 및 검증
- 🐛 이슈 재현 및 디버깅

## 🚀 시작하기

### 사전 요구사항

이 프로젝트는 Expo 개발 빌드를 사용합니다. **React Native Skia는 개발 빌드가 필요하며 Expo Go에서는 작동하지 않습니다.**

### 설치

1. 의존성 설치

   ```bash
   npm install
   ```

2. React Native Skia 설치 (아직 설치되지 않은 경우)

   ```bash
   npm install @shopify/react-native-skia
   ```

3. iOS의 경우, Pod 설치

   ```bash
   cd ios && pod install && cd ..
   ```

4. 앱 실행

   ```bash
   npx expo start
   ```

출력 결과에서 다음 옵션으로 앱을 열 수 있습니다:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

**참고**: React Native Skia는 Expo Go에서 작동하지 않습니다. 반드시 개발 빌드를 사용해야 합니다.

**app** 디렉토리 내의 파일을 편집하여 개발을 시작할 수 있습니다. 이 프로젝트는 [file-based routing](https://docs.expo.dev/router/introduction)을 사용합니다.

### 개발 빌드 생성

#### iOS

```bash
npm run ios:build
# 또는
eas build --platform ios --profile development --local
```

#### Android

```bash
npm run android:build
# 또는
eas build --platform android --profile development --local
```

## 🎨 React Native Skia란?

React Native Skia는 [Skia](https://skia.org/) - Chrome, Android, Flutter 등에서 사용되는 Google의 2D 그래픽 라이브러리 - 를 React Native로 가져옵니다. React Native 앱에서 커스텀 그래픽, 애니메이션, 시각 효과를 만들 수 있는 강력하고 성능이 뛰어난 방법을 제공합니다.

### 주요 기능

- 🚀 **고성능**: GPU 가속으로 60fps 네이티브 렌더링
- 🎨 **풍부한 그래픽 API**: 경로, 도형, 그라디언트, 이미지, 텍스트 등
- ✨ **부드러운 애니메이션**: UI 스레드에서 실행되는 Worklet 기반 애니메이션
- 🔄 **Reanimated 통합**: `react-native-reanimated`와의 완벽한 통합
- 📱 **크로스 플랫폼**: iOS, Android, Web에서 작동
- 🎯 **TypeScript 지원**: 완전한 TypeScript 정의 포함

## 🧪 Skia 사용 예제

### 기본 예제

Skia로 그리기의 간단한 예제:

```tsx
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function SkiaExample() {
  const size = useSharedValue(50);

  React.useEffect(() => {
    size.value = withRepeat(withTiming(100, { duration: 1000 }), -1, true);
  }, []);

  return (
    <Canvas style={{ flex: 1 }}>
      <Group>
        <Circle cx={128} cy={128} r={size} color="lightblue" />
      </Group>
    </Canvas>
  );
}
```

### 핵심 개념

#### Canvas

`Canvas` 컴포넌트는 모든 Skia 그리기의 루트입니다. 그리기 표면을 제공합니다.

#### 그리기 컴포넌트

- **도형**: `Circle`, `Rect`, `RoundedRect`, `Path`, `Line`, `Polygon`
- **텍스트**: `Text`, `TextPath`
- **이미지**: `Image`, `ImageShader`
- **효과**: `Blur`, `ColorMatrix`, `DisplacementMap`
- **그라디언트**: `LinearGradient`, `RadialGradient`, `SweepGradient`

#### 애니메이션

Skia는 `react-native-reanimated` worklet과 완벽하게 작동합니다:

```tsx
import { useDerivedValue } from "react-native-reanimated";
import { Path } from "@shopify/react-native-skia";

const path = useDerivedValue(() => {
  const p = Skia.Path.Make();
  p.moveTo(0, 0);
  p.lineTo(animatedX.value, animatedY.value);
  return p;
});
```

### 일반적인 사용 사례

- 🎨 **커스텀 UI 컴포넌트**: 버튼, 카드, 진행 표시줄
- 📊 **데이터 시각화**: 차트, 그래프, 대시보드
- 🎬 **애니메이션**: 복잡한 애니메이션 및 전환
- 🖼️ **이미지 처리**: 필터, 효과, 변환
- ✏️ **그리기 앱**: 스케치, 페인팅, 주석
- 🎯 **게임**: 2D 게임 그래픽 및 스프라이트

## 🔄 프로젝트 초기화

준비가 되면 다음 명령을 실행하세요:

```bash
npm run reset-project
```

이 명령은 스타터 코드를 **app-example** 디렉토리로 이동하고 개발을 시작할 수 있는 빈 **app** 디렉토리를 만듭니다.

## 📚 더 알아보기

Expo로 프로젝트 개발에 대해 더 알아보려면 다음 리소스를 참고하세요:

- [Expo 문서](https://docs.expo.dev/): 기본 사항을 배우거나 [가이드](https://docs.expo.dev/guides)로 고급 주제를 탐색하세요.
- [Expo 튜토리얼](https://docs.expo.dev/tutorial/introduction/): Android, iOS, 웹에서 실행되는 프로젝트를 만드는 단계별 튜토리얼을 따라해보세요.

React Native Skia에 대해 더 알아보려면:

- [React Native Skia 공식 문서](https://shopify.github.io/react-native-skia/)
- [React Native Skia GitHub](https://github.com/Shopify/react-native-skia)
- [Skia 공식 사이트](https://skia.org/)

## 🤝 커뮤니티 참여

범용 앱을 만드는 개발자 커뮤니티에 참여하세요.

- [Expo on GitHub](https://github.com/expo/expo): 오픈 소스 플랫폼을 보고 기여하세요.
- [Discord 커뮤니티](https://chat.expo.dev): Expo 사용자와 채팅하고 질문하세요.
