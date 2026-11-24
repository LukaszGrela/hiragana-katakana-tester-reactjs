/*
   Copyright 2018 Łukasz 'Severiaan' Grela GrelaDesign

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/* Projekt nie ma jeszcze runnera testów, więc korzystamy z globalnego API
   wspólnego dla Jest/Mocha/Vitest. Po dodaniu runnera usuń ten plik i włącz
   jego oficjalne typy (np. @types/jest) w tsconfig "types". */
declare function it(
  description: string,
  body: () => void | Promise<void>,
): void;
