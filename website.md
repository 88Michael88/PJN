Na 3.0:
Rola AUTOR
Przygotuj jedną stronę HTML zawierającą katalog produktów.
• minimum 60 rekordów;
• minimum 10 atrybutów każdego rekordu, na przykład: nazwa, cena, kategoria, producent, dostępność,
ocena, liczba opinii, data dodania, gwarancja, odnośnik do produktu;
• rekordy zapisane w dwóch różnych strukturach — część jako tabela, część jako powtarzalne karty
(article albo div);
• nazwy klas i identyfikatorów semantyczne (cena, produkt, data-id) — bez nazw generowanych typu
a3jX9;
• strona statyczna, bez JavaScriptu. 

Na 4.0:
Rola AUTOR
Wymagania obowiązkowe
• wszystko z poziomu 3.0;
• paginacja — minimum 5 podstron, łącznie minimum 200 rekordów;
• podstrony szczegółów — każdy rekord ma własną stronę z minimum 8 dodatkowymi atrybutami
(łącznie minimum 18 atrybutów).

Wybierz co najmniej 3 utrudnienia
• ceny zapisane jako „1 299,00 zł", a u części rekordów w innej walucie;
• braki wartości w dwóch różnych polach, u co najmniej 15% rekordów;
• minimum 8 zduplikowanych rekordów rozrzuconych po różnych podstronach;
• tabela zapisana bez znacznika tbody oraz kilkanaście niezamkniętych znaczników li lub p;
• niespójne formaty dat w tym samym polu (2026-08-26, 26.08.2026, „wczoraj");
• część atrybutów dostępna wyłącznie w atrybutach data-*, a nie w treści elementu;
• encje i znaki specjalne w treści (&nbsp;, &oacute;, twarde spacje w liczbach);
• dwie podstrony o odmiennej strukturze niż pozostałe — parser musi wykryć obie;
• własne utrudnienie o zbliżonym poziomie trudności.

Na 5.0:
Rola AUTOR
Wymagania obowiązkowe
• wszystko z poziomu 4.0; 
• treść wstrzykiwana JavaScriptem — rekordy trzymane w pliku JSON i dodawane do dokumentu przez
fetch; w źródle HTML (Ctrl+U) rekordów ma NIE być;
• doładowywanie porcjami — przycisk „Wczytaj więcej" lub doładowanie przy przewijaniu;
• minimum 400 rekordów i minimum 22 atrybuty;
• sztuczne opóźnienie 300–2000 ms przy doładowywaniu porcji.

Wybierz co najmniej 2 utrudnienia
• minimum jeden atrybut widoczny dopiero po interakcji — kliknięcie zakładki, rozwinięcie details;
• filtrowanie lub sortowanie zmieniające zawartość bez przeładowania strony;
• prosty serwer (Python lub Node) zamiast http.server, zwracający kod 429 po przekroczeniu limitu
żądań, wraz z nagłówkiem Retry-After;
• część rekordów renderowana dopiero po przewinięciu do danego miejsca strony (leniwe ładowanie);
• losowa kolejność atrybutów w karcie produktu — parser nie może polegać na pozycji;
• własne utrudnienie o zbliżonym poziomie trudności.

---


Wymagania:
- min 400 rekordów.
- min 20 atrybutów dla każdego rekordu.
    - min 2 dodatkowych atrybutów na każdy rekord na jego pod stronie.
- rekordy zapisane w dwóch postaciach.
- paginacja - min 5 podstron.
- semantyczne nazwy. 
- nie spójność dat.
- znaki specjalne w postaci &nbsk, &oacute.
- ceny zapisane w różnych walutach.
- treść dodawana przez JavaScript za pomocą fetch.
- dodawanie porcjami - dodanie elementu `read more`.
- sztuczne opóźnienie 300-2000ms.
- min jeden atrybut widoczny po interakcji.
- losowa kolejność atrybutów.

GET /feed
GET /post/:id









