import { Provider } from "@lexical/yjs";
import {WebsocketProvider} from 'y-websocket';
import { Doc } from "yjs";

export function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Doc>
): Provider {
  let doc = yjsDocMap.get(id);

  if (doc === undefined) {
    doc = new Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }


  return new WebsocketProvider(`ws://localhost:3000/docroom?did=${id}`, '',doc, {
    connect: false,
  }) as unknown as Provider;
}

export interface UserProfile {
  name: string;
  color: string;
}

export function getRandomCursorColor() {
  // 生成红色分量，范围在 200 到 255 之间，保证偏暖且颜色较浅
  const r = Math.floor(Math.random() * 56) + 200;
  // 生成绿色分量，范围在 100 到 200 之间，保证偏暖且颜色较浅
  const g = Math.floor(Math.random() * 101) + 100;
  // 生成蓝色分量，范围在 0 到 100 之间，保证偏暖且颜色较浅
  const b = Math.floor(Math.random() * 101);
  // 将 RGB 分量转换为十六进制字符串并拼接
  const color = "#" + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  return color;
}