package com.budsapp.config;

import com.budsapp.entity.*;
import com.budsapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CurrencyRepository currencyRepository;
    private final ManufacturerRepository manufacturerRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        User admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("password"))
                .fullName("Administrator")
                .role("ADMIN")
                .build();
        userRepository.save(admin);

        if (currencyRepository.count() == 0) {
            currencyRepository.save(new Currency("GEL", "Georgian Lari", "\u20be", 2.65));
            currencyRepository.save(new Currency("USD", "US Dollar", "$", 1.0));
        }

        if (manufacturerRepository.count() == 0) {
            String[] manufacturers = {"Nature Made", "Solgar", "Centrum", "Vital Proteins", "Garden of Life",
                    "Nature Bounty", "NOW Foods", "Himalaya", "L'Oreal", "Neutrogena",
                    "Nivea", "Vaseline", "Coppertone", "Burts Bees", "Olay",
                    "Clinique", "Scholl", "Garnier", "Maybelline", "Johnsons"};
            for (String name : manufacturers) {
                manufacturerRepository.save(Manufacturer.builder().name(name).build());
            }
        }

        if (categoryRepository.count() == 0) {
            String[] categories = {"Herbal", "Mineral", "Medic+", "Cosmethic", "Other", "Cosmetics", "Creams", "Shampoos"};
            for (String name : categories) {
                categoryRepository.save(Category.builder().name(name).build());
            }
        }
    }
}
