# pokedex-multi-framework
Projeto de Desenvolvimento Mobile para a PUCRS - Integração React Native e Flutter.

# 📱 Pokédex Multi-Framework (React Native & Flutter)

Projeto desenvolvido para a **Fase 2 da disciplina de Desenvolvimento de Sistemas Mobile** na **PUCRS**. A aplicação demonstra o consumo de APIs REST e a criação de interfaces modernas em dois frameworks distintos.

## 🔗 Demonstração em Vídeo
Confira o funcionamento dos aplicativos rodando no **Motorola Moto G15**:
👉 [Assista aqui no YouTube](https://youtu.be/BGZaMEbE-yU)

---

## 🚀 Tecnologias e Funcionalidades

### ⚛️ Aplicativo Principal (React Native)
Localizado na pasta `/PokemonApp`, este projeto foca em:
- **Consumo de API:** Integração com a [PokeAPI v2](https://pokeapi.co/).
- **Navegação:** Uso de Stack Navigator para transição entre lista e detalhes.
- **Dinamismo:** Filtros de busca em tempo real e exibição de atributos técnicos.
- **Hooks:** Gerenciamento de estado com `useState` e `useEffect`.

### 💙 Tecnologia Secundária (Flutter)
Localizado na pasta `/pokedex_flutter`, este protótipo valida:
- **Interoperabilidade:** Renderização de UI consistente em tecnologia distinta.
- **Performance:** Uso de `ListView.builder` para listas fluidas.
- **Configuração Nativa:** Ambiente configurado para Android 15.

---

## 🛠️ Como rodar os projetos

### Pré-requisitos
- Node.js & Expo Go (para React Native)
- Flutter SDK (para o protótipo em Dart)

### Passos
1. Clone o repositório.
2. Para o **React Native**:
   ```bash
   cd PokemonApp
   npm install
   npx expo start

   Para o Flutter:

Bash
cd pokedex_flutter
flutter pub get
flutter run

👩‍💻 Autora
Caroline Zolet Estudante de Análise e Desenvolvimento de Sistemas - PUCRS.
