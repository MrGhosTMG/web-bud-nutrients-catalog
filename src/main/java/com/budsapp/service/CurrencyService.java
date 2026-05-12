package com.budsapp.service;

import com.budsapp.dto.CurrencyDTO;
import com.budsapp.entity.Currency;
import com.budsapp.exception.BadRequestException;
import com.budsapp.repository.CurrencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrencyService {

    private final CurrencyRepository currencyRepository;

    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }

    public Currency addCurrency(CurrencyDTO dto) {
        if (currencyRepository.findById(dto.getCode()).isPresent()) {
            throw new BadRequestException("Currency already exists");
        }
        return currencyRepository.save(Currency.builder()
                .code(dto.getCode().toUpperCase())
                .name(dto.getName())
                .symbol(dto.getSymbol())
                .rateToUSD(dto.getRateToUSD())
                .build());
    }

    public Currency updateRate(String code, Double rate) {
        Currency currency = currencyRepository.findById(code)
                .orElseThrow(() -> new BadRequestException("Currency not found"));
        currency.setRateToUSD(rate);
        return currencyRepository.save(currency);
    }

    public void deleteCurrency(String code) {
        if ("GEL".equalsIgnoreCase(code)) {
            throw new BadRequestException("Cannot delete base currency GEL");
        }
        currencyRepository.deleteById(code);
    }
}
