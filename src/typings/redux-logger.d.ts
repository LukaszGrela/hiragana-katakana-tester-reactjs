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

/* redux-logger nie dostarcza typów (i nie ma @types), a jego API potrzebne
   jest tylko w jednym miejscu — tworzeniu middleware w store. */
declare module 'redux-logger' {
  import type { Middleware } from 'redux';

  export const logger: Middleware;
  export default logger;
}
